<img width="2048" height="672" alt="image" src="https://github.com/user-attachments/assets/8c0cc7ae-ba9a-4a48-8014-58571c464c4e" /><img width="439" height="427" alt="image" src="https://github.com/user-attachments/assets/8fdd5b62-64d9-4695-b13f-b3f6bd7f004e" /># EC2 에서 도커/쿠버네티스 설치하기 (k3s)
### EC2 인스턴스 생성하기
<img width="828" height="828" alt="image" src="https://github.com/user-attachments/assets/8bb67c48-8644-4976-8194-fbe1f4efa032" />
<img width="828" height="476" alt="image" src="https://github.com/user-attachments/assets/1b0da72f-717b-4d00-bf71-28d8e70c6348" />
<img width="828" height="671" alt="image" src="https://github.com/user-attachments/assets/d89acd34-6c66-49ca-acd0-50537ba3cfa0" />
<img width="828" height="386" alt="image" src="https://github.com/user-attachments/assets/4562a724-c60f-42eb-a8f0-ffa210d180ae" />

### EC2내에 Docker 설치하기
```
sudo apt-get update && \
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common && \
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && \
sudo apt-key fingerprint 0EBFCD88 && \
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" && \
sudo apt-get update && \
sudo apt-get install -y docker-ce && \
sudo usermod -aG docker ubuntu && \
newgrp docker && \
sudo curl -L "https://github.com/docker/compose/releases/download/2.27.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
sudo chmod +x /usr/local/bin/docker-compose && \
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

<img width="573" height="84" alt="image" src="https://github.com/user-attachments/assets/3903ff97-fd0d-4305-bef1-335503afc5d1" />

잘 설치되었는지 확인

### k3s 설치하기
```
$ curl -sfL https://get.k3s.io | sh - # k3s 설치
$ sudo chmod 644 /etc/rancher/k3s/k3s.yaml # 권한 부여
$ sudo kubectl version # k3s 잘 설치됐는 지 확인
```
<img width="418" height="72" alt="image" src="https://github.com/user-attachments/assets/fbc7f3cc-7e5a-4158-a2cd-98e092454ec0" />

# [예제] 디플로이먼트, 서비스를 활용해 웹 서버(Nginx) 띄워보기
### 디플로이먼트, 서비스를 활용해 웹 서버(Nginx) 띄워보기
1. 매니페스트 파일 작성하기
deployment.yaml
```
apiVersion: apps/v1
kind: Deployment

# Deployment 기본 정보
metadata:
  name: nginx-deployment # Deployment 이름

# Deployment 세부 정보
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx # 아래에서 정의한 Pod 중 'app: nginx'이라는 값을 가진 파드를 선택
      
  # 배포할 Pod 정의
  template:
    metadata:
      labels: # 레이블 (= 카테고리)
        app: nginx
    spec:
      containers:
      - name: nginx-container # 컨테이너 이름
        image: nginx # 컨테이너를 생성할 때 사용할 이미지
        ports:
        - containerPort: 80 # 컨테이너에서 사용하는 포트를 명시적으로 표현
```
service.yaml
```
apiVersion: v1
kind: Service

# Service 기본 정보
metadata:
  name: nginx-service # Service 이름
  
# Service 세부 정보
spec:
  type: NodePort # Service의 종류
  selector:
    app: nginx # 실행되고 있는 파드 중 'app: nginx'이라는 값을 가진 파드와 서비스를 연결
  ports:
    - protocol: TCP # 서비스에 접속하기 위한 프로토콜
      port: 80 # 쿠버네티스 내부에서 Service에 접속하기 위한 포트 번호
      targetPort: 80 # 매핑하기 위한 파드의 포트 번호
      nodePort: 30000 # 외부에서 사용자들이 접근하게 될 포트 번호
```
2.  매니페스트 파일 실행시키기
```
$ kubectl apply -f deployment.yaml
$ kubectl apply -f service.yaml
```
3. 오브젝트가 작 생성됐는 지 확인
```
$ kubectl get pods
$ kubectl get deployment
$ kubectl get service
```
<img width="711" height="152" alt="image" src="https://github.com/user-attachments/assets/ff97f67f-54e9-4dac-ac8f-ccb1ea84fa80" />
<img width="742" height="318" alt="image" src="https://github.com/user-attachments/assets/54c0492a-9c3d-4565-839e-ba45f1b7fdf4" />

### 생성한 오브젝트 정리하기
```
$ kubectl delete all --all
```
<img width="562" height="157" alt="image" src="https://github.com/user-attachments/assets/dc63deda-da37-46ff-bbb6-29ed3020b3be" />

# [예제] 백엔드(Spring Boot) 서버 배포하기, DB 연동하기 (+ RDS, ECR)
### 로컬 환경에서의 아키텍처
<img width="1173" height="443" alt="image" src="https://github.com/user-attachments/assets/c0597ea5-6cca-4833-b6c7-e42867b1507e" />
### 배포 환경에서의 아키텍처
<img width="1135" height="517" alt="image" src="https://github.com/user-attachments/assets/7605f4cb-e181-4bad-9bc8-d12fefb71ce1" />
로컬 환경에서의 아키텍처와의 차이점은 크게 2가지이다. 

1. **로컬에 도커 이미지를 저장하지 않고, 외부 저장소인 AWS ECR에 도커 이미지를 저장한다.**
2. **로컬의 데이터베이스를 사용하지 않고, 외부 데이터베이스인 AWS RDS를 활용한다.**

# RDS, ECR 생성하기
### RDS 생성하기
<img width="1106" height="1314" alt="image" src="https://github.com/user-attachments/assets/e05d31f7-cfca-4772-b1da-709faa0b24ac" />
<img width="1080" height="938" alt="image" src="https://github.com/user-attachments/assets/a74aa530-e563-4616-b8c6-d83610862cc0" />
<img width="1086" height="1032" alt="image" src="https://github.com/user-attachments/assets/03b9a5eb-a240-45ae-8f41-4368512bbcbc" />
<img width="1104" height="1278" alt="image" src="https://github.com/user-attachments/assets/690e28c5-fb50-48f2-a0e3-ef98260faff3" />
<img width="1082" height="928" alt="image" src="https://github.com/user-attachments/assets/ddea56b1-7f65-4739-abf8-90191cdc0468" />
<img width="1088" height="884" alt="image" src="https://github.com/user-attachments/assets/abe8508e-9bce-4060-9e6c-52851c9e38b6" />
EC2 페이지에서 보안그룹 생성 한 뒤에 기존 VPC 보안 그룹 선택하기
<img width="1414" height="1194" alt="image" src="https://github.com/user-attachments/assets/3904c884-f29d-4cd3-8313-481a01286e27" />
<img width="960" height="546" alt="image" src="https://github.com/user-attachments/assets/f4cbaa47-db31-4e7b-a124-5f4c9457c9bd" />
(나머지 옵션은 디폴트 그대로)
<img width="922" height="628" alt="image" src="https://github.com/user-attachments/assets/ad6c4296-89f7-4046-8030-a2f0f4cafa14" />

### ECR 생성하기
<img width="1134" height="1248" alt="image" src="https://github.com/user-attachments/assets/ec674eb9-b224-4ad6-87ab-231ff7a65c58" />

# 백엔드(Spring Boot) 서버 프로젝트, 매니페스트 파일 구성하기
### 새로운 아키텍처에 맞게 코드 수정하기
1. Spring Boot 프로젝트 클론 받기
```
$ git clone https://github.com/JSCODE-COURSE/kubernetes-backend.git
```
2. 쿠버네티스 매니페스트 파일 클론 받기
```
git clone https://github.com/JSCODE-COURSE/kubernetes-manifests.git
```
3. **코드 살펴보기**
    
    **[Spring Boot 프로젝트]**
    
    - `/boards GET` : 게시글 조회 API
    - `/boards POST` : 게시글 작성 API
    - JPA를 활용해 DB와 연동하고 있는 상태
    - Docker 이미지로 빌드할 수 있게 `Dockerfile`을 작성해놓은 상태
    
    **[매니페스트 파일]**
    
    - Spring Boot 서버를 띄우는 데 필요한 **Deployment, Service, ConfigMap, Secret** 파일들로 구성되어 있음
    - `spring-secret.yaml`은 민감한 값이 포함된 파일이므로, 원래라면 `.gitignore`에 추가해서 버전 관리가 되지 않게 만들어야 한다. 하지만 편의상 Github Repository에 같이 올려두었다.
        - `spring-secret.yaml`은 서버에 따로 전달해서 활용하거나, [SealedSecret](https://coffeewhale.com/sealedsecret)을 활용해서 관리하는 편이다. (이 외에도 AWS Secrets Manager, Vault 등 시크릿 값을 관리하는 다양한 서비스가 있다.)

# 백엔드(Spring Boot) 서버 빌드한 후 ECR로 Push하기
### 백엔드(Spring Boot) 서버 빌드한 후 ECR로 Push하기
1. 로컬 환경에 AWS CLI 설치하기
2. Access Key 발급받기
<img width="439" height="427" alt="image" src="https://github.com/user-attachments/assets/4e224cc6-a252-40b1-9a2d-da425b809482" />
<img width="2048" height="575" alt="image" src="https://github.com/user-attachments/assets/9f1cdd2e-1adc-4cfc-8bde-c662098f0815" />
3. AWS CLI로 액세스 키 등록하기
```
$ aws configure

AWS Access Key ID [None]: <위에서 발급한 Key id>
AWS Secret Access Key [None]: <위에서 발급한 Secret Access Key>
Default region name [None]: ap-northeast-2
Default output format [None]:
```
4. ECR로 들어가서 생성한 레포지토리로 들어가기
<img width="2048" height="672" alt="image" src="https://github.com/user-attachments/assets/8fe207e2-9ff2-4ecf-90b3-edafb186aa0d" />
5. 푸시 명령 확인하기
<img width="1648" height="1614" alt="image" src="https://github.com/user-attachments/assets/b6dec11a-55bf-47cf-b0c4-ba88b4afda83" />
6. 로컬 환경에서 Spring Boot 프로젝트를 Docker 이미지로 빌드한 후에 ECR로 Push하기
```
$ ./gradlew clean build

$ aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 002177417362.dkr.ecr.ap-northeast-2.amazonaws.com
$ docker build -t kube-ecr .
$ docker tag kube-ecr:latest 002177417362.dkr.ecr.ap-northeast-2.amazonaws.com/kube-ecr:1.0
$ docker push 002177417362.dkr.ecr.ap-northeast-2.amazonaws.com/kube-ecr:1.0
```
7. 정상적으로 이미지가 Push 됐는 지 확인하기
<img width="1005" height="403" alt="image" src="https://github.com/user-attachments/assets/85ead8cb-2525-4ea9-9c7a-4f33f010ec58" />

# EC2가 ECR로부터 이미지를 Pull 받아올 수 있게 권한 부여하기
### EC2가 ECR로부터 이미지를 Pull 받아올 수 있게 권한 부여하기
1. AWS CLI 설치하기
