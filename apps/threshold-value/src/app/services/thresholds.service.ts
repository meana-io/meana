import axios from 'axios';
import { CreateGlobalDto } from '../../../../api-agent/src/app/Domains/global/dto/create-global.dto';
import { Thresholds } from '../../../../../libs/shared/Types/Thresholds';
import { NodeCpu } from '../../../../../libs/shared/Types/NodeCpu';
import { NodeRam } from '../../../../../libs/shared/Types/NodeRam';
import { Node } from '../../../../../libs/shared/Types/Node';
import { User } from '../../../../../libs/shared/Types/User';

interface OverThreshold {
  property: string;
  isOver: boolean;
  actual: number;
}

export class ThresholdsService {
  async checkThreshold(agentDto: string) {
    const dto = JSON.parse(agentDto) as CreateGlobalDto;
    const thresholdQb = `{"nodeUuid": "${dto.nodeUuid}"}`;

    const {
      data: [...thresholds],
    } = await axios.get<Thresholds[]>(
      `http://meana_api:3333/api/node-thresholds?search=${thresholdQb}`
    );

    const node = await axios.get<Node[]>(
      `http://meana_api:3333/api/nodes?filter[uuid]=${dto.nodeUuid}`
    );

    const usersReqeust = await axios.get<User[]>(
      'http://meana_api:3333/api/users?filter[email_notifications]=true'
    );

    let users = usersReqeust.data;

    users = users.filter(
      (user: User) =>
        Date.parse(user.last_notification_at) + 60_000 < Date.now()
    );

    const checkList = [
      ThresholdsService.cpuMinOver(thresholds[0].cpuMin, dto.cpu),
      ThresholdsService.cpuMaxOver(thresholds[0].cpuMax, dto.cpu),
      ThresholdsService.ramMinOver(thresholds[0].cpuMax, dto.ram),
      ThresholdsService.ramMaxOver(thresholds[0].cpuMax, dto.ram),
    ];

    return checkList.reduce(function (carry, actual) {
      if (actual.isOver) {
        carry.push({
          ...actual,
          nodeName: node.data[0].name,
          to: users.map((user) => user.email),
        });
      }

      return carry;
    }, []);
  }

  private static cpuMinOver(
    cpuMinThreshold: number,
    nodeCpu: NodeCpu
  ): OverThreshold {
    return {
      isOver: +nodeCpu.usage <= cpuMinThreshold,
      actual: +nodeCpu.usage,
      property: 'cpu_usage_min',
    };
  }

  private static cpuMaxOver(
    cpuMaxThreshold: number,
    nodeCpu: NodeCpu
  ): OverThreshold {
    return {
      isOver: +nodeCpu.usage >= cpuMaxThreshold,
      actual: +nodeCpu.usage,
      property: 'cpu_usage_max',
    };
  }

  private static ramMinOver(
    ramMinThreshold: number,
    nodeRam: NodeRam
  ): OverThreshold {
    const percentageUsage = +nodeRam.total / +nodeRam.used;
    return {
      isOver: percentageUsage <= ramMinThreshold,
      actual: percentageUsage,
      property: 'ram_usage_min',
    };
  }

  private static ramMaxOver(
    ramMaxThreshold: number,
    nodeRam: NodeRam
  ): OverThreshold {
    const percentageUsage = +nodeRam.total / +nodeRam.used;
    return {
      isOver: percentageUsage >= ramMaxThreshold,
      actual: percentageUsage,
      property: 'ram_usage_max',
    };
  }
}
