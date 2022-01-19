#!/bin/bash
cd /home/ubuntu/ASSIST/server

export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export NCP_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names NCP_SECRET --query Parameters[0].Value | sed 's/"//g')
export NCP_ACCESS=$(aws ssm get-parameters --region ap-northeast-2 --names NCP_ACCESS --query Parameters[0].Value | sed 's/"//g')
export SMS_URI=$(aws ssm get-parameters --region ap-northeast-2 --names SMS_URI --query Parameters[0].Value | sed 's/"//g')
export SMS_SERVICEID=$(aws ssm get-parameters --region ap-northeast-2 --names SMS_SERVICEID --query Parameters[0].Value | sed 's/"//g')
export HOST_PHONE=$(aws ssm get-parameters --region ap-northeast-2 --names HOST_PHONE --query Parameters[0].Value | sed 's/"//g')
export HOMEPAGE_URL=$(aws ssm get-parameters --region ap-northeast-2 --names HOMEPAGE_URL --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENTID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENTID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_ADMINKEY=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_ADMINKEY --query Parameters[0].Value | sed 's/"//g')
export SERVER_URL=$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_URL --query Parameters[0].Value | sed 's/"//g')
export HOMEPAGE_URL_LOCAL=$(aws ssm get-parameters --region ap-northeast-2 --names HOMEPAGE_URL_LOCAL --query Parameters[0].Value | sed 's/"//g')
export KAKAOBIZ_SERVICEID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAOBIZ_SERVICEID --query Parameters[0].Value | sed 's/"//g')
export CUSTOMER_SERVICE_NUMBER=$(aws ssm get-parameters --region ap-northeast-2 --names CUSTOMER_SERVICE_NUMBER --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start dist/main.js