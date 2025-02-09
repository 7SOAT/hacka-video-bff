data "aws_api_gateway_rest_api" "bff" {
  name = "bff-apigw"
}

data "aws_lb" "load_balancer" {
  tags = {
    "kubernetes.io/service-name" = "default/hacka-video-bff-svc"
  }
}