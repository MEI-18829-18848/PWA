import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from './admin-guard/admin.guard';
import * as fs from 'fs';
import * as path from 'path';
import { UserGuard } from './user/user.guard';

@Module({
  imports: [
    JwtModule.register({
      publicKey:
        '-----BEGIN PUBLIC KEY-----\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzzoxvZLjeHF/FICV+rSV\n' +
        'DAApETIMD8xwbUFBs2y9zFrPi8zNe0I0NKe4AJM6jF/X5W31Ib/P/Ux64EBTnLro\n' +
        'NbTbwz7+P1RefKBcNqq0CEkG7BeDuCvnt3ln0Y58KtZlP+pazyb975Px1vzAS/zp\n' +
        'vM6lUX5jow3Frcvm7kixJnkDgDmMZ0reFJtiZFjPszZJVpu6feb+MxsJQgw41GqE\n' +
        'AXV5+cPLZpwmq64mLUPPagVvFCKpHO4HejhAGc4PFYXwBYkUzX9fnbV/LNzNXDb5\n' +
        'e51vLnl1YkCYIpHtco/2CZae4R7Oaic0a+m7YvA7xUMN/fGsMZ07agr8DZmp5xoC\n' +
        'WQIDAQAB\n' +
        '-----END PUBLIC KEY-----',
      signOptions: { expiresIn: '1h', algorithm: 'RS256' },
    }),
  ],
  providers: [AdminGuard, UserGuard],
  exports: [AdminGuard, UserGuard],
})
export class AuthModule {}
