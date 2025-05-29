#!/bin/bash

# 서버 정보 설정
SERVER_USER="ubuntu"
SERVER_HOST="146.56.102.130"
KEY_PATH="$KEYS/Soap_key.pem"  # 환경 변수 $KEYS를 사용하므로 로컬에서 이 변수가 설정되어 있어야 합니다
REMOTE_DIR="/home/ubuntu/git-tul-fe"

# 색상 설정
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Git-tul 프론트엔드 배포 시작...${NC}"

# 1. 로컬에서 프로덕션 빌드
echo -e "${GREEN}1. 프로덕션 빌드 생성 중...${NC}"
pnpm build

# 2. 서버에 디렉토리 생성
echo -e "${GREEN}2. 서버에 디렉토리 생성 중...${NC}"
ssh -i "$KEY_PATH" $SERVER_USER@$SERVER_HOST "mkdir -p $REMOTE_DIR"

# 3. 필요한 파일들을 서버로 복사
echo -e "${GREEN}3. 파일 전송 중...${NC}"
scp -i "$KEY_PATH" -r \
  .next \
  public \
  package.json \
  pnpm-lock.yaml \
  next.config.ts \
  ecosystem.config.js \
  $SERVER_USER@$SERVER_HOST:$REMOTE_DIR/

# 4. 서버에서 의존성 설치 및 PM2로 애플리케이션 실행
echo -e "${GREEN}4. 서버에서 의존성 설치 및 애플리케이션 시작 중...${NC}"
ssh -i "$KEY_PATH" $SERVER_USER@$SERVER_HOST << EOF
  echo "서버에 접속했습니다"
  export NVM_DIR="\$HOME/.nvm"
  [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
  nvm use default > /dev/null
  cd $REMOTE_DIR
  
  echo "의존성 설치 중..."
  pnpm install --prod
  
  # PM2가 설치되어 있는지 확인하고 없으면 설치
  if ! command -v pm2 &> /dev/null; then
    echo "PM2 설치 중..."
    npm install -g pm2
  fi
  
  # 이미 실행 중인 인스턴스가 있는지 확인하고 있으면 재시작, 없으면 시작
  if pm2 list | grep -q "git-tul-fe"; then
    echo "PM2로 애플리케이션 재시작 중..."
    pm2 restart git-tul-fe
  else
    echo "PM2로 애플리케이션 시작 중..."
    pm2 start ecosystem.config.js
  fi
  
  # PM2 프로세스 저장 (시스템 재부팅 시 자동 시작을 위해)
  pm2 save
EOF

echo -e "${GREEN}배포가 완료되었습니다!${NC}"
echo -e "${YELLOW}서버 접속: http://$SERVER_HOST:3000${NC}" 