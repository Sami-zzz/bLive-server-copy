import axios from 'axios';
import { ParameterizedContext } from 'koa';

import { successHandler } from '@/app/handler/success-handle';

class SRSController {
  async rtcV1Publish(ctx: ParameterizedContext, next) {
    const { streamurl, sdp } = ctx.request.body;
    const srsRes = await axios.post('http://localhost:1985/rtc/v1/publish/', {
      sdp,
      streamurl,
    });
    successHandler({ ctx, data: srsRes.data });
    await next();
  }
}

export default new SRSController();
