import { NestMiddleware } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';

export class JsonBodyParserMiddleware implements NestMiddleware {
  use = json({ limit: '500mb' });
}

export class UrlEncodedParserMiddleware implements NestMiddleware {
  use = urlencoded({ extended: true });
}
