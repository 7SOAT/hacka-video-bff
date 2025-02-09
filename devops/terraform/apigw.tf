#region [VPC LINK]
resource "aws_api_gateway_vpc_link" "bff" {
  name        = "bff-service-apigw-vpclink"
  description = "BFF service API Gateway VPC Link. Managed by Terraform."
  target_arns = [local.loadbalancer_arn]
}
#endregion
