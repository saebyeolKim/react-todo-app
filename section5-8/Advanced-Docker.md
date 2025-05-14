# Docker Compose를 사용하는 이유

### ✅ Docker Copmose란?

여러 개의 Docker 컨테이너들을 하나의 서비스로 정의하고 구성해 하나의 묶음으로 관리할 수 있게 도와주는 툴이다. 

### ✅ Docker Compose를 사용하는 이유

1. **여러 개의 컨테이너를 관리하는 데 용이**
    
    여러 개의 컨테이너로 이루어진 복잡한 애플리케이션을 한 번에 관리할 수 있게 해준다. 여러 컨테이너를 하나의 환경에서 실행하고 관리하는 데 도움이 된다. 
    
2. **복잡한 명령어로 실행시키던 걸 간소화 시킬 수 있음**
    
    이전에 MySQL 이미지를 컨테이너로 실행시킬 때 아래와 같은 명령어를 실행시켰다. 
    
    ```bash
    $ docker run -e MYSQL_ROOT_PASSWORD=password123 -p 3306:3306 -v /Users/jaeseong/Documents/Develop/docker-mysql/mysql_data:/var/lib/mysql -d mysql
    ```
    
    너무 복잡하지 않은가? Docker Compose를 사용하면 위와 같이 컨테이너를 실행시킬 때마다 복잡한 명령어를 입력하지 않아도 된다. 단순히 `docker compose up` 명령어만 실행시키면 된다.

# [실습] Docker Compose 전체 흐름 느껴보기 (Nginx 설치 및 실행)

### ✅ Docker CLI로 컨테이너를 실행시킬 때

```html
$ docker run --name webserver -d -p 80:80 nginx
```

### ✅ Docker Compose로 컨테이너를 실행시킬 때

1. **compose.yml 파일 작성하기**
    
    **compose.yml**
    
    ```bash
    services:
        my-web-server:
    		container_name: webserver
    		image: nginx
    		ports: 
    			- 80:80
    ```
    
    - `services: my-web-server` : Docekr Compose에서 하나의 컨테이너를 **서비스(service)**라고 부른다. 이 옵션은 **서비스에 이름**을 붙이는 기능이다.
    - `container_name: web-server` : 컨테이너를 띄울 때 붙이는 별칭이다. CLI에서 `--name web-server` 역할과 동일하다.
    - `image: nginx` : 컨테이너를 실행시킬 때 어떤 이미지를 사용할 지 정의하는 명령어이다. `$ docker run [이미지명]`와 동일한 역할이다.
    - `ports` : 포트 매핑은 어떻게 할 지를 설정하는 옵션이다. CLI에서`-p 80:80` 역할과 동일하다.
  
      ![image](https://github.com/user-attachments/assets/024334d0-4404-4916-8167-30d9781ddfc8)


1. **compose 파일 실행시키기**
    
    ```bash
    $ docker compose up -d
    ```
    

1. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    ```
    

1. [localhost:80](http://localhost:80) 들어가보기
    
    ![image](https://github.com/user-attachments/assets/b0d61286-d02e-49df-962e-bb1579115d7e)

    
2. **compose로 실행된 컨테이너 삭제**
    
    ```bash
    $ docker compose down
    ```
