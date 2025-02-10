import { HttpService } from "@nestjs/axios";
import { HttpException, Inject } from "@nestjs/common";
import { OAuthTokenResponse } from "./dto/response/oauth-token.response.dto";
import AwsConfig from "src/interfaces/config/aws.config";
import EnvironmentConfigService from "@config/environment-config/environment-config.service";

export default class AWSProvider {
   private readonly grant_type: string = 'authorization_code';
   private readonly client_id: string = this._awsConfig.getAwsClientId();
   private readonly client_secret: string = this._awsConfig.getAwsClientSecret();
   private readonly redirect_uri: string = this._awsConfig.getAwsRedirectUrl();
   private readonly awsRegion: string = this._awsConfig.getAwsRegion();
   private readonly awsCognitoDomain: string = this._awsConfig.getAwsCognitoDomain();

   constructor(
      @Inject(HttpService)
      private readonly _httpService: HttpService,

      @Inject(EnvironmentConfigService)
      private readonly _awsConfig: AwsConfig
   ) { }

   async GetOAuthToken(code: string): Promise<OAuthTokenResponse> {
      const headers = {
         'Content-Type': 'application/x-www-form-urlencoded',
      };
      const url: string = `https://${this.awsCognitoDomain}.auth.${this.awsRegion}.amazoncognito.com/oauth2/token`;
      const params = {
         grant_type: this.grant_type,
         client_id: this.client_id,
         client_secret: this.client_secret,
         code: code,
         redirect_uri: this.redirect_uri
      };

      try {
         console.log(`auth parameters: `, {
            url,
            headers,
            params
         });
         const { data } = await this._httpService.axiosRef.post(
            url,
            null,
            { headers, params }
         );
         return data;
      } catch (err: any) {
         throw new HttpException(err.response?.data, err.response?.status);
      }
   }
}