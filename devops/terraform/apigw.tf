#region [VPC LINK]
resource "aws_api_gateway_vpc_link" "bff" {
  name        = "bff-service-apigw-vpclink"
  description = "BFF service API Gateway VPC Link. Managed by Terraform."
  target_arns = [local.loadbalancer_arn]
}
#endregion
#region [Resources]
resource "aws_api_gateway_resource" "videos" {
  rest_api_id = local.apigw_id
  parent_id   = local.apigw_root_resource_id
  path_part   = "videos"
}
resource "aws_api_gateway_resource" "videos_url" {
  rest_api_id = local.apigw_id
  parent_id   = aws_api_gateway_resource.videos.id
  path_part   = "url"
}
resource "aws_api_gateway_resource" "videos_get_signed_url" {
  rest_api_id = local.apigw_id
  parent_id   = aws_api_gateway_resource.videos.id
  path_part   = "getSignedUrl"
}
resource "aws_api_gateway_resource" "videos_save" {
  rest_api_id = local.apigw_id
  parent_id   = aws_api_gateway_resource.videos.id
  path_part   = "save"
}
resource "aws_api_gateway_resource" "auth" {
  rest_api_id = local.apigw_id
  parent_id   = local.apigw_root_resource_id
  path_part   = "auth"
}
#endregion
#region [Method]
resource "aws_api_gateway_method" "get_videos" {
  rest_api_id   = local.apigw_id
  resource_id   = aws_api_gateway_resource.videos.id
  http_method   = "GET"
  authorization = "NONE"  
}
resource "aws_api_gateway_method" "get_videos_url" {
  rest_api_id   = local.apigw_id
  resource_id   = aws_api_gateway_resource.videos_url.id
  http_method   = "GET"
  authorization = "NONE"  
}
resource "aws_api_gateway_method" "get_videos_get_signed_url" {
  rest_api_id   = local.apigw_id
  resource_id   = aws_api_gateway_resource.videos_get_signed_url.id
  http_method   = "GET"
  authorization = "NONE"  
}
resource "aws_api_gateway_method" "post_save" {
  rest_api_id   = local.apigw_id
  resource_id   = aws_api_gateway_resource.videos_save.id
  http_method   = "POST"
  authorization = "NONE"  
}
resource "aws_api_gateway_method" "post_auth" {
  rest_api_id   = local.apigw_id
  resource_id   = aws_api_gateway_resource.auth.id
  http_method   = "POST"
  authorization = "NONE"  
}
#endregion
#region [Integrations]
resource "aws_api_gateway_integration" "get_videos" {
  rest_api_id = local.apigw_id
  resource_id = aws_api_gateway_resource.videos.id
  http_method = "GET"

  integration_http_method = "ANY"
  type                    = "HTTP_PROXY"
  uri                     = "http://${local.loadbalancer_dns_name}/videos"
  passthrough_behavior    = "WHEN_NO_MATCH"
  content_handling        = "CONVERT_TO_TEXT"

  request_parameters = {    
    "integration.request.header.Accept"        = "'application/json'"    
  }

  connection_type = "VPC_LINK"
  connection_id   = aws_api_gateway_vpc_link.bff.id

  depends_on = [ aws_api_gateway_method.get_videos ]
}
resource "aws_api_gateway_integration" "get_videos_url" {
  rest_api_id = local.apigw_id
  resource_id = aws_api_gateway_resource.videos_url.id
  http_method = "GET"

  integration_http_method = "ANY"
  type                    = "HTTP_PROXY"
  uri                     = "http://${local.loadbalancer_dns_name}/videos/url"
  passthrough_behavior    = "WHEN_NO_MATCH"
  content_handling        = "CONVERT_TO_TEXT"

  request_parameters = {    
    "integration.request.header.Accept"        = "'application/json'"    
  }

  connection_type = "VPC_LINK"
  connection_id   = aws_api_gateway_vpc_link.bff.id

  depends_on = [ aws_api_gateway_method.get_videos_url ]
}
resource "aws_api_gateway_integration" "get_videos_get_signed_url" {
  rest_api_id = local.apigw_id
  resource_id = aws_api_gateway_resource.videos_get_signed_url.id
  http_method = "GET"

  integration_http_method = "ANY"
  type                    = "HTTP_PROXY"
  uri                     = "http://${local.loadbalancer_dns_name}/videos/getSignedUrl"
  passthrough_behavior    = "WHEN_NO_MATCH"
  content_handling        = "CONVERT_TO_TEXT"

  request_parameters = {    
    "integration.request.header.Accept"  = "'application/json'"    
  }

  connection_type = "VPC_LINK"
  connection_id   = aws_api_gateway_vpc_link.bff.id

  depends_on = [ aws_api_gateway_method.get_videos_get_signed_url ]
}
resource "aws_api_gateway_integration" "post_videos_save" {
  rest_api_id = local.apigw_id
  resource_id = aws_api_gateway_resource.videos_save.id
  http_method = "POST"

  integration_http_method = "ANY"
  type                    = "HTTP_PROXY"
  uri                     = "http://${local.loadbalancer_dns_name}/videos/save"
  passthrough_behavior    = "WHEN_NO_MATCH"
  content_handling        = "CONVERT_TO_TEXT"

  request_parameters = {    
    "integration.request.header.Accept"        = "'application/json'"    
  }

  connection_type = "VPC_LINK"
  connection_id   = aws_api_gateway_vpc_link.bff.id

  depends_on = [ aws_api_gateway_method.post_save ]
}
resource "aws_api_gateway_integration" "post_auth" {
  rest_api_id = local.apigw_id
  resource_id = aws_api_gateway_resource.auth.id
  http_method = "POST"

  integration_http_method = "ANY"
  type                    = "HTTP_PROXY"
  uri                     = "http://${local.loadbalancer_dns_name}/auth"
  passthrough_behavior    = "WHEN_NO_MATCH"
  content_handling        = "CONVERT_TO_TEXT"

  request_parameters = {    
    "integration.request.header.Accept"        = "'application/json'"    
  }

  connection_type = "VPC_LINK"
  connection_id   = aws_api_gateway_vpc_link.bff.id

  depends_on = [ aws_api_gateway_method.post_auth ]
}
#endregion