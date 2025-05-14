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

# 자주 사용하는 Docker Compose CLI 명령어

<aside>
💡 `docker-compose`로 시작하는 명령어는 더 이상 업데이트를 지원하지 않는 Docker Compose의 v1 명령어이므로 되도록이면 사용하지 말자. v2부터는 `docker compose`로 시작하는 명령어를 사용한다.

</aside>

> 아래 명령어들은 `compose.yml`이 존재하는 디렉토리에서 실행시켜야 한다.
> 

### ✅ compose 파일 작성

**compose.yml**

```bash
services:
	websever:
		container_name: webserver
		image: nginx
		ports: 
			- 80:80
```

### ✅ compose.yml에서 정의한 컨테이너 실행

```bash
$ docker compose up    # 포그라운드에서 실행
$ docker compose up **-d** # 백그라운드에서 실행
```

- `-d` : 백그라운드에서 실행

### ✅ Docker Compose로 실행시킨 컨테이너 확인하기

```bash
# compose.yml에 정의된 컨테이너 중 실행 중인 컨테이너만 보여준다. 
$ docker compose ps 

# compose.yml에 정의된 모든 컨테이너를 보여준다.
$ docker compose ps -a
```

### ✅ Docker Compose 로그 확인하기

```bash
# compose.yml에 정의된 모든 컨테이너의 로그를 모아서 출력한다.
$ docker compose logs
```

### ✅ 컨테이너를 실행하기 전에 이미지 재빌드하기

```bash
$ docker compose up --build # 포그라운드에서 실행
$ docker compose up --build -d # 백그라운드에서 실행
```

- `compose.yml`에서 정의한 이미지 파일에서 코드가 변경 됐을 경우, 이미지를 다시 빌드해서 컨테이너를 실행시켜야 코드 변경된 부분이 적용된다. 그러므로 이럴 때에는 `--build` 옵션을 추가해서 사용해야 한다.

> **참고** : `docker compose up` vs `docker compose up --build`
> 
> - `docker compose up` : 이미지가 없을 때만 빌드해서 컨테이너를 실행시킨다. 이미지가 이미 존재하는 경우 이미지를 빌드하지 않고 컨테이너를 실행시킨다.
> - `docker compose up --build` : 이미지가 있건 없건 무조건 빌드를 다시해서 컨테이너를 실행시킨다.

### ✅ 이미지 다운받기 / 업데이트하기

```bash
$ docker compose pull
```

- `compose.yml`에서 정의된 이미지를 다운 받거나 업데이트 한다.
    - 로컬 환경에 이미지가 없다면 이미지를 다운 받는다.
    - 로컬 환경에 이미 이미지가 있는데, Dockerhub의 이미지와 다른 이미지일 경우 이미지를 업데이트 한다.

### ✅ Docker Compose에서 이용한 컨테이너 종료하기

```bash
$ docker compose down
```

# [실습] Docker Compose로 Redis 실행시키기

### ✅ Docker CLI로 컨테이너를 실행시킬 때

```html
$ docker run -d -p 6379:6379 redis
```

### ✅ Docker Compose로 컨테이너를 실행시킬 때

1. **compose.yml 파일 작성하기**
    
    **compose.yml**
    
    ```bash
    services:
    	my-cache-server:
    		image: redis
    		ports: 
    			- 6379:6379 
    ```

    ![image](https://github.com/user-attachments/assets/42110e67-357e-4bdd-9189-9bd3515c2a7a)

    

1. **compose 파일 실행시키기**
    
    ```bash
    $ docker compose up -d
    ```
    

1. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    ```
    
2. **컨테이너 실행시킬 때 에러 없이 잘 실행됐는 지 로그 체크**
    
    ```
    $ docker logs [컨테이너 ID 또는 컨테이너명]
    ```
    
3. **Redis 컨테이너에 접속**
    
    ```
    $ docker exec -it [컨테이너 ID 또는 컨테이너명] bash
    ```
    
4. **컨테이너에서 redis 사용해보기**
    
    ```
    $ redis-cli
    
    127.0.0.1:6379> set 1 jscode
    127.0.0.1:6379> get 1
    ```
    ![image](https://github.com/user-attachments/assets/5700be69-ee15-44ce-a1ba-66c42854b131)

    
5. **compose로 실행된 컨테이너 삭제**
    
    ```bash
    $ docker compose down
    ```
