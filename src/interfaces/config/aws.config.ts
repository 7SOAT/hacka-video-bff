export default interface AwsConfig {
    getAwsClientId(): string;
    getAwsClientSecret(): string;
    getAwsRedirectUrl(): string;
    getAwsRegion(): string;
    getAwsCognitoDomain(): string;
}