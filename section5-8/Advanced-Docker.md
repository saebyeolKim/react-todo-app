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


2. **compose 파일 실행시키기**
    
    ```bash
    $ docker compose up -d
    ```
    

3. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    ```
    

4. [localhost:80](http://localhost:80) 들어가보기
    
    ![image](https://github.com/user-attachments/assets/b0d61286-d02e-49df-962e-bb1579115d7e)

    
5. **compose로 실행된 컨테이너 삭제**
    
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

# [실습] Docker Compose로 MySQL 실행시키기

### ✅ Docker CLI로 컨테이너를 실행시킬 때

```html
$ docker run -e MYSQL_ROOT_PASSWORD=pwd1234 -p 3306:3306 -v /Users/jaeseong/Documents/Develop/docker-mysql/mysql_data:/var/lib/mysql -d mysql
```

### ✅ Docker Compose로 MySQL 실행시키기

1. **compose 파일 작성하기**
    
    **compose.yml**
    
    ```bash
    services:
      my-db:
        image: mysql
        environment:
          MYSQL_ROOT_PASSWORD: pwd1234
        volumes:
          - ./mysql_data:/var/lib/mysql
        ports:
          - 3306:3306
    ```
    
    - `environment: ...` : CLI에서 `-e MYSQL_ROOT_PASSWORD=password` 역할과 동일하다.
    - `volumes: ...` : CLI에서 `-v {호스트 경로}:/var/lib/mysql` 역할과 동일하다.

    ![image](https://github.com/user-attachments/assets/fe5595f8-522f-4b59-ba69-d08316fefa27)

2. **compose 파일 실행시키기**
    
    ```bash
    $ docker compose up -d
    ```
    

3. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    ```
    

4. **잘 작동하는 지 DBeaver에 연결시켜보기**
    
   ![image](https://github.com/user-attachments/assets/c33a5770-c5b5-4411-9c10-27cbbbc438b7)


5. **volume의 경로에 데이터가 저장되고 있는 지 확인하기**
    
    
6. **compose로 실행된 컨테이너 삭제**
    
    ```bash
    $ docker compose down
    ```


# [실습] Docker Compose로 백엔드(Spring Boot) 실행시키기

### ✅ Docker Compose로 백엔드(Spring Boot) 실행시키기

1. **프로젝트 셋팅**
    
    [start.spring.io](https://start.spring.io/)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e35a8144-c5ff-40f0-b123-384a331e35bb/8ecc70e9-bb6b-4d08-b06b-f860fb575448/Untitled.png)
    
    - Java 17 버전을 선택하자. 아래 과정을 Java 17 버전을 기준으로 진행할 예정이다.
    
2. **간단한 코드 작성**
    
    **AppController**
    
    ```java
    @RestController
    public class AppController {
      @GetMapping("/")
      public String home() {
        return "Hello, World!";
      }
    }
    ```
    
3. **Dockerfile 작성하기**
    
    **Dockerfile**
    
    ```docker
    FROM openjdk:17-jdk
    
    COPY build/libs/*SNAPSHOT.jar /app.jar
    
    ENTRYPOINT ["java", "-jar", "/app.jar"]
    ```
    
4. **Spring Boot 프로젝트 빌드하기**
    
    ```bash
    $ ./gradlew clean build
    ```
    
5. **compose 파일 작성하기**
    - **참고)** compose를 작성하지 않고 Docker CLI로 실행시킬 때
        
        ```html
        $ docker build -t hello-server .
        $ docker run -d -p 8080:8080 hello-server
        ```
        
    
    **compose.yml**
    
    ```html
    services:
      my-server:
        build: .
        ports:
          - 8080:8080
    ```
    
    - `build: .` : `compose.yml`이 존재하는 디렉토리(`.`)에 있는 `Dockerfile`로 이미지를 생성해 컨테이너를 띄우겠다는 의미이다.
    
6. **compose 파일 실행시키기**
    
    ```bash
    $ docker compose up -d **--build**
    ```
    - `--build` : Dockerfile 을 다시 build 해서 docker compose up -d 실행, 즉 스프링 부트 프로젝트가 바뀌면 --build 넣어줘야 한다.
    
7. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    ```
    
8. [**localhost:8080](http://localhost:8080)으로 들어가보기**
    
    ![image](https://github.com/user-attachments/assets/b952a3d1-00e5-48e9-b54b-946937629b36)

    
9. **compose로 실행된 컨테이너 삭제**
    
    ```bash
    $ docker compose down
    ```

# [실습] Docker Compose로 프론트엔드(Next.js) 실행시키기

### ✅ Docker Compose로 프론트엔드(Next.js) 실행시키기

1. **Next.js 프로젝트 만들기**
    
    ```bash
    $ npx create-next-app@latest
    ```
    
2. **Dockerfile 작성하기**
    
    **Dockerfile**
    
    ```docker
    FROM node:20-alpine
    
    WORKDIR /app
    
    COPY . .
    
    RUN npm install
    
    RUN npm run build
    
    EXPOSE 3000
    
    ENTRYPOINT [ "npm", "run", "start" ]
    ```
    
3. **.dockerignore 작성하기**
    
    **.dockerignore**
    
    ```jsx
    node_modules
    ```
    
    이미지를 생성할 때 `npm install`을 통해 처음부터 깔끔하게 필요한 의존성만 설치한다. 따라서 호스트 컴퓨터에 있는 `node_modules`는 컨테이너로 복사해갈 필요가 없다. 
    
4. **compose 파일 작성하기**
    - **참고)** compose를 작성하지 않고 Docker CLI로 실행시킬 때
        
        ```html
        $ docker build -t my-web-server .
        $ docker run -d -p 80:3000 my-web-server
        ```
        
    
    **compose.yml**
    
    ```html
    services:
      my-web-server:
        build: .
        ports:
          - 3000:3000
    ```
    
5. **compose 파일 실행시키기**
    
    ```bash
    $ docker compose up -d **--build**
    ```
    
6. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    ```
    
7. **localhost:3000으로 들어가보기**
    
    ![image](https://github.com/user-attachments/assets/23d7f896-b6c5-4c91-be4a-1ed26d43b281)

    
8. **compose로 실행된 컨테이너 삭제**
    
    ```bash
    $ docker compose down
    ```

# 실습] Docker Compose로 프론트엔드(Next.js) 실행시키기

### ✅ Docker Compose로 프론트엔드(Next.js) 실행시키기

1. **Next.js 프로젝트 만들기**
    
    ```bash
    $ npx create-next-app@latest
    ```
    
2. **Dockerfile 작성하기**
    
    **Dockerfile**
    
    ```docker
    FROM node:20-alpine
    
    WORKDIR /app
    
    COPY . .
    
    RUN npm install
    
    RUN npm run build
    
    EXPOSE 3000
    
    ENTRYPOINT [ "npm", "run", "start" ]
    ```
    
3. **.dockerignore 작성하기**
    
    **.dockerignore**
    
    ```jsx
    node_modules
    ```
    
    이미지를 생성할 때 `npm install`을 통해 처음부터 깔끔하게 필요한 의존성만 설치한다. 따라서 호스트 컴퓨터에 있는 `node_modules`는 컨테이너로 복사해갈 필요가 없다. 
    
4. **compose 파일 작성하기**
    - **참고)** compose를 작성하지 않고 Docker CLI로 실행시킬 때
        
        ```html
        $ docker build -t my-web-server .
        $ docker run -d -p 80:3000 my-web-server
        ```
        
    
    **compose.yml**
    
    ```html
    services:
      my-web-server:
        build: .
        ports:
          - 80:3000
    ```
    
5. **compose 파일 실행시키기**
    
    ```bash
    $ docker compose up -d **--build**
    ```
    
6. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    ```
    
7. **localhost:80으로 들어가보기**
    
   ![image](https://github.com/user-attachments/assets/1ffbf74c-d859-420d-88e0-d97541bfd690)


    
8. **compose로 실행된 컨테이너 삭제**
    
    ```bash
    $ docker compose down
    ```


# [실습] Docker Compose로 프론트엔드(HTML, CSS, Nginx) 실행시키기

### ✅ Docker Compose로 프론트엔드(HTML, CSS, Nginx) 실행시키기

1. **HTML, CSS 파일 만들기**
    
    **index.html**
    
    ```html
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <h1>My Web Page</h1>
    </body>
    </html>
    ```
    
    **주의)** Nginx의 기본 설정에 의하면 메인 페이지(첫 페이지)의 파일명을 `index.html`이라고 지어야 한다. 
    
    **style.css**
    
    ```bash
    * {
      color: blue;
    }
    ```
    
2. **Dockerfile 작성하기**
    
    **Dockerfile**
    
    ```docker
    FROM nginx 
    COPY ./ /usr/share/nginx/html
    ```
    
3. **compose 파일 작성하기**
    - **참고)** compose를 작성하지 않고 Docker CLI로 실행시킬 때
        
        ```html
        $ docker build -t my-web-server .
        $ docker run -d -p 80:80 my-web-server
        ```
        
    
    **compose.yml**
    
    ```html
    services:
      my-web-server:
        build: .
        ports:
          - 80:80
    ```
    
4. **compose 파일 실행시키기**
    
    ```bash
    $ docker compose up -d **--build**
    ```
    
5. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    ```
    
6. [**localhost:80](http://localhost:80)으로 들어가보기**
    
    ![image](https://github.com/user-attachments/assets/3051bb39-b678-423c-b730-82ec5b484395)
    
7. **compose로 실행된 컨테이너 삭제**
    
    ```bash
    $ docker compose down
    ```

# [실습] MySQL, Redis 컨테이너 동시에 띄워보기

### ✅ Docker Compose로 MySQL, Redis 실행시키기

1. **compose 파일 작성하기**

 	compose.yml
	```
	services:
	  my-db:
	    image: mysql
	    environment:
	      MYSQL_ROOT_PASSWORD: pwd1234
	    volumes:
	      - ./mysql_data:/var/lib/mysql
	    ports:
	      - 3306:3306
	
	  my-cache-server:
	    image: redis
	    ports:
	      - 6379:6379
 	```
​
	- `주의)` YAML 문법에서는 들여쓰기가 중요하다. 
 
2. **compose 파일 실행시키기**

    ```bash
    $ docker compose up -d
    ```

    ![image](https://github.com/user-attachments/assets/581c55f0-46b9-4e4f-a1e2-b6272aad7431)


3. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    ```
​
4. **compose로 실행된 컨테이너 삭제**

    $ docker compose down


# [실습] Spring Boot, MySQL 컨테이너 동시에 띄워보기

### ✅ Spring Boot, MySQL 컨테이너 동시에 띄워보기

1. **Spring Boot 프로젝트 셋팅**
    
    [start.spring.io](https://start.spring.io/)
    
    ![Untitled](Untitled.png)
    
    - Java 17 버전을 선택하자. 아래 과정을 Java 17 버전을 기준으로 진행할 예정이다.
    - Dependencies는 `Spring Boot DevTools`, `Spring Web`, `Spring Data JPA`, `MySQL Driver`를 선택해라.
    
2. **간단한 코드 작성**
    
    **AppController**
    
    ```java
    @RestController
    public class AppController {
      @GetMapping("/")
      public String home() {
        return "Hello, World!";
      }
    }
    ```
    
3. **application.yml에 DB 연결을 위한 정보 작성하기**
    
    **application.yml**
    
    ```bash
    spring:
      datasource:
        url: jdbc:mysql://localhost:3306/**mydb**
        username: **root**
        password: **pwd1234**
        driver-class-name: com.mysql.cj.jdbc.Driver
    ```
    

1. **불필요한 테스트 코드 삭제**
    
    ![Untitled](Untitled%201.png)
    
2. **Dockerfile 작성하기**
    
    **Dockerfile**
    
    ```bash
    FROM openjdk:17-jdk
    
    COPY build/libs/*SNAPSHOT.jar /app.jar
    
    ENTRYPOINT ["java", "-jar", "/app.jar"]
    ```
    

1. **compose.yml 파일 작성하기**
    
    **compose.yml**
    
    ```yaml
    services:
      my-server:
        build: .
        ports:
          - 8080:8080
    		# my-db의 컨테이너가 생성되고 healthy 하다고 판단 될 때, 해당 컨테이너를 생성한다. 
        depends_on:
          my-db:
            condition: service_healthy
      my-db:
        image: mysql
        environment:
          MYSQL_ROOT_PASSWORD: pwd1234
          MYSQL_DATABASE: mydb # MySQL 최초 실행 시 mydb라는 데이터베이스를 생성해준다.
        volumes:
          - ./mysql_data:/var/lib/mysql
        ports:
          - 3306:3306
        healthcheck:
          test: [ "CMD", "mysqladmin", "ping" ] # MySQL이 healthy 한 지 판단할 수 있는 명령어
          interval: 5s # 5초 간격으로 체크
          retries: 10 # 10번까지 재시도
    ```
    
2. **Spring Boot 프로젝트 빌드하기**
    
    ```bash
    $ ./gradlew clean build
    ```
    
3. **compose 파일 실행시키기**
    
    ```bash
    $ docker compose up -d **--build**
    ```
    
4. **compose 실행 현황 보기**
    
    ```bash
    $ docker compose ps
    $ docker ps
    $ docker logs [Container ID]
    ```
    

# [실습] Spring Boot, MySQL 컨테이너 동시에 띄워보기

## ✅ Spring Boot, MySQL 컨테이너 동시에 띄워보기

1. **Spring Boot 프로젝트 셋팅**

[start.spring.io](https://start.spring.io/)
- Java 17 버전을 선택하자. 아래 과정을 Java 17 버전을 기준으로 진행할 예정이다.
- Dependencies는 `Spring Boot DevTools`, `Spring Web`, `Spring Data JPA`, `MySQL Driver`를 선택해라.

2. **간단한 코드 작성**

**AppController**

```java
@RestController
public class AppController {
  @GetMapping("/")
  public String home() {
    return "Hello, World!";
  }
}
```

3. **application.yml에 DB 연결을 위한 정보 작성하기**

**application.yml**

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydb
    username: root
    password: pwd1234
    driver-class-name: com.mysql.cj.jdbc.Driver
```

4. **불필요한 테스트 코드 삭제**

![Untitled](Untitled%201.png)

5. **Dockerfile 작성하기**

**Dockerfile**

```dockerfile
FROM openjdk:17-jdk

COPY build/libs/*SNAPSHOT.jar /app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

6. **compose.yml 파일 작성하기**

**compose.yml**

```yaml
services:
  my-server:
    build: .
    ports:
      - 8080:8080
    # my-db의 컨테이너가 생성되고 healthy 하다고 판단 될 때, 해당 컨테이너를 생성한다. 
    depends_on:
      my-db:
        condition: service_healthy

  my-db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: pwd1234
      MYSQL_DATABASE: mydb # MySQL 최초 실행 시 mydb라는 데이터베이스를 생성해준다.
    volumes:
      - ./mysql_data:/var/lib/mysql
    ports:
      - 3306:3306
    healthcheck:
      test: [ "CMD", "mysqladmin", "ping" ] # MySQL이 healthy 한 지 판단할 수 있는 명령어
      interval: 5s # 5초 간격으로 체크
      retries: 10 # 10번까지 재시도
```


![image](https://github.com/user-attachments/assets/5ccee3c8-891a-4b0d-820f-6e7e06806d7b)


7. **Spring Boot 프로젝트 빌드하기**

```bash
$ ./gradlew clean build
```

8. **compose 파일 실행시키기**

```bash
$ docker compose up -d --build
```

9. **compose 실행 현황 보기**

```bash
$ docker compose ps
$ docker ps
$ docker logs [Container ID]
```

Spring Boot 컨테이너의 로그를 열어보면 아래와 같이 에러 메시지가 떠있다.  
아래 에러 메시지는 DB와 연결이 제대로 이루어지지 않았을 때 발생하는 에러이다.

![image](https://github.com/user-attachments/assets/59941d1e-4cc9-44e1-9a63-3bf1ba0fc33b)


MySQL이 정상적으로 실행이 안 되고 있는 건지 확인하기 위해  
DB GUI 툴(ex. Workbench, Datagrip, DBeaver 등)을 활용해 DB 연결을 해보자.  
MySQL에 연결을 시도해보면 정상적으로 연결이 잘 되는 걸 확인할 수 있다.



> ❗ 그럼 도대체 무엇이 문제길래 Spring Boot가 MySQL에 연결이 안 되는 걸까?  
> 그 원인에 대해서 다음 강의에서 알아보자.


