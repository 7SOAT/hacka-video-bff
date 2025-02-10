#region [VPC LINK]
resource "aws_api_gateway_vpc_link" "bff" {
  name        = "bff-service-apigw-vpclink"
  description = "BFF service API Gateway VPC Link. Managed by Terraform."
  target_arns = [local.loadbalancer_arn]
}
#endregion
#region [/auth]
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = local.apigw_id
  parent_id   = local.apigw_root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = local.apigw_id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"

  request_parameters = {
    "method.request.path.proxy"           = true
    "method.request.header.Authorization" = false
  }
}

resource "aws_api_gateway_integration" "proxy" {
  rest_api_id = local.apigw_id
  resource_id = aws_api_gateway_resource.proxy.id
  http_method = "ANY"

  integration_http_method = "ANY"
  type                    = "HTTP_PROXY"
  uri                     = "http://${local.loadbalancer_dns_name}/{proxy}"
  passthrough_behavior    = "WHEN_NO_MATCH"
  content_handling        = "CONVERT_TO_TEXT"

  request_parameters = {
    "integration.request.path.proxy"           = "method.request.path.proxy"
    "integration.request.header.Accept"        = "'application/json'"
    "integration.request.header.Authorization" = "method.request.header.Authorization"
  }

  connection_type = "VPC_LINK"
  connection_id   = aws_api_gateway_vpc_link.bff.id
}
#endregion