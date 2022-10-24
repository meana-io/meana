import {Column} from "sequelize-typescript";

export interface Cpu {
    frequency?: string;
    coresQuantity?: string;
    manufacture?: string;
    model?: string;
}
