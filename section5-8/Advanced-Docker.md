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


# 컨테이너로 실행시킨 Spring Boot가 MySQL에 연결이 안 되는 이유

### ✅ 컨테이너로 실행시킨 Spring Boot가 MySQL에 연결이 안 되는 이유

![image](https://github.com/user-attachments/assets/9d61d396-a7f8-45db-bc67-18598914af7c)


각각의 컨테이너는 **자신만의 네트워크망과 IP 주소**를 가지고 있다. 호스트 컴퓨터 입장에서 localhost는 호스트 컴퓨터를 가리키지만, Spring Boot 컨테이너 입장에서 localhost는 Spring Boot 컨테이너를 가리킨다. 

그런데 Spring Boot의 코드를 작성할 때 DB 정보를 아래와 같이 입력했었다. Spring Boot가 실행되는 환경인 컨테이너 입장에서 [localhost:3306](http://localhost:3306)라는 주소는, Spring Boot 컨테이너 내부에 있는 3306번 포트와 연결을 시도하게 된다. 하지만 Spirng Boot가 실행되는 컨테이너 내부의 3306번 포트에는 아무것도 실행되고 있지 않다. 이러한 구조상의 문제 때문에 Spring Boot가 MySQL에 연결이 안 되고 있었던 것이다. 

**application.yml**

```bash
spring:
  datasource:
    url: jdbc:mysql://**localhost**:3306/mydb
    username: root
    password: pwd1234
    driver-class-name: com.mysql.cj.jdbc.Driver
```

> **그럼 어떻게 Spring Boot의 컨테이너에서 다른 컨테이너에 존재하는 MySQL에 연결을 할 수 있을까?**
> 

**compose.yml에서 정의한 Service 이름으로 서로 통신할 수 있다.** 바로 예시로 알아보자. 

### ✅ Spring Boot의 DB 정보를 아래와 같이 수정한 뒤 시도해보기

**application.yml**

```bash
spring:
  datasource:
    url: jdbc:mysql://**my-db**:3306/mydb
    username: root
    password: pwd1234
    driver-class-name: com.mysql.cj.jdbc.Driver
```

> 위 코드에서 **my-db**는 도대체 어디서 나온 값일까?
> 

우리가 이전에 작성했던 `compose.yml`을 보면 각 컨테이너에 service 이름(`my-server`, `my-db`)을 작성했었다. 

**compose.yml**

```
services:
  my-server:
    build: .
    ports:
      - 8080:8080
    depends_on:
      my-db:
        condition: service_healthy
  **my-db**:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: pwd1234
      MYSQL_DATABASE: mydb
    volumes:
      - ./mysql_data:/var/lib/mysql
    ports:
      - 3306:3306
    healthcheck:
      test: [ "CMD", "mysqladmin", "ping" ]
      interval: 5s
      retries: 10
```

이 **service 이름**이 **컨테이너의 주소**를 뜻한다. 해당 컨테이너의 IP 주소와 같은 역할을 한다.

위와 같이 코드를 수정한 뒤에 다시 한 번 컨테이너를 실행시켜보자. 

```bash
$ ./gradlew clean build
$ docker compose down
$ docker compose up --build -d

$ docker ps # 정상적으로 Spring Boot, MySQL이 실행된 걸 확인할 수 있다. 
```

# [실습] Spring Boot, MySQL, Redis 컨테이너 동시에 띄워보기

### ✅ 1. Spring Boot 프로젝트에 Redis 연결 코드 추가하기

**build.gradle**

```
...

dependencies {
	...
	**implementation 'org.springframework.boot:spring-boot-starter-data-redis'**
}

```

**application.yml**

```
spring:
  datasource:
    url: jdbc:mysql://my-db:3306/mydb
    username: root
    password: pwd1234
    driver-class-name: com.mysql.cj.jdbc.Driver
  **data:
    redis:
      host: localhost
      port: 6379**
```

**RedisConfig**

```java
@Configuration
public class RedisConfig {

  @Bean
  public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
    RedisTemplate<String, Object> template = new RedisTemplate<>();
    template.setConnectionFactory(connectionFactory);
    template.setKeySerializer(new StringRedisSerializer());
    template.setValueSerializer(new GenericJackson2JsonRedisSerializer());
    return template;
  }
}
```

**AppController**

```
@RestController
public class AppController {

  **@Autowired
  private RedisTemplate<String, Object> redisTemplate;**

  @GetMapping("/")
  public String home() {
    **redisTemplate.opsForValue().set("abc", "def");**
    return "Hello, World!";
  }
}
```

**compose.yml**

```
services:
  my-server:
    build: .
    ports:
      - 8080:8080
    depends_on:
      my-db:
        condition: service_healthy
      **my-cache-server:
        condition: service_healthy**  
  my-db:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: pwd1234
      MYSQL_DATABASE: mydb
    volumes:
      - ./mysql_data:/var/lib/mysql
    ports:
      - 3306:3306
    healthcheck:
      test: [ "CMD", "mysqladmin", "ping" ]
      interval: 5s
      retries: 10
  **my-cache-server:
    image: redis
    ports:
      - 6379:6379
    healthcheck:
      test: [ "CMD", "redis-cli", "ping" ]
      interval: 5s
      retries: 10**
```

### ✅ 2. Docker 컨테이너로 띄워보기

```
$ ./gradlew clean build
$ docker compose down
$ docker compose up --build -d
```

위 명령어를 통해 컨테이너를 띄운 뒤에 [localhost:8080](http://localhost:8080)으로 요청을 해보면 아래와 같은 에러가 발생한다. 

![image](https://github.com/user-attachments/assets/88f3cf00-9791-4979-8bfa-c431e291dafc)


![image](https://github.com/user-attachments/assets/59f72f8b-7a24-4d40-976d-c473b0fcce46)


`Connection refused` 에러가 발생한 이유는 Redis와 연결이 잘 안 됐기 때문이다. 왜 안됐는 지 `application.yml` 파일을 다시 한 번 살펴보자. 

**application.yml**

```
spring:
  datasource:
    url: jdbc:mysql://my-db:3306/mydb
    username: root
    password: pwd1234
    driver-class-name: com.mysql.cj.jdbc.Driver
  data:
    redis:
      **~~host: localhost~~
      host: my-cache-server**
      port: 6379
```

각 컨테이너는 각자의 네트워크를 가지고 있기 때문에, localhost가 아니라 Redis가 실행되고 있는 컨테이너로 통신을 해야 한다. Redis가 실행되고 있는 컨테이너의 주소는 service 이름으로 표현한다고 했다. `compose.yml`에서 Redis가 실행되고 있는 컨테이너의 service 이름을 `my-cache-server`라고 이름 붙였다. 

위와 같이 코드를 수정한 뒤에 다시 한 번 실행시켜보자. 

```
$ ./gradlew clean build
$ docker compose down
$ docker compose up --build -d
```

![image](https://github.com/user-attachments/assets/e5808f34-b4f8-4c3c-b1ff-c2f144efde64)


에러가 발생하지 않고 정상적으로 실행되는 걸 확인할 수 있다. 

### ✅ 그림으로 이해하기

![image](https://github.com/user-attachments/assets/120c8e0b-7174-4655-835b-fdfd3c03d15c)


# 배포(Deployment)란?

### ✅ 배포(Deployment)란?

개발자들은 **“이제 기능 구현도 끝났고 테스트도 끝났으니 배포하자!"**라는 말을 자주 한다. 여기서 **배포**란 무슨 뜻일까? **배포(Deployment)란 다른 사용자들이 인터넷을 통해서 사용할 수 있게 만드는 걸 의미한다.** 쉽게 얘기해서 우리가 만든 웹 페이지나 서버를 다른 사람들이 사용하려면 인터넷 상에 배포가 돼있어야 한다. 

![image](https://github.com/user-attachments/assets/1d8b66c6-e2cb-4383-b3fc-7000b952ca3c)


자신의 컴퓨터에서 개발을 할 때는 localhost라는 주소로 테스트도 하고 개발을 한다. 하지만 이 localhost는 다른 컴퓨터에서는 접근이 불가능한 주소이다. 배포를 하게 되면 IP(ex. 124.16.2.1)나 도메인(ex. www.naver.com)과 같이 고유의 주소를 부여받게 되고, 다른 컴퓨터에서 그 주소로 접속할 수 있게 된다. 이게 바로 배포(Deployment)다. 

따라서 어떤 서비스를 완성했다면, 그 다음 단계로 해야 하는 게 **배포(Deployment)**이다. 코딩을 배울 때도 기본적인 백엔드 서버를 만들 수 있는 역량이 갖춰졌다면, 그 다음에 배워야 하는 게 **배포(Deployment)**이다.


# EC2란? / EC2를 왜 배울까? / 현업에서 EC2는 주로 언제 쓸까?

### ✅ EC2(Elastic Compute Cloud)란?

<aside>
💡 한 줄 요약 : **컴퓨터를 빌려서 원격으로 접속해 사용하는 서비스**이다.

</aside>

**EC2**를 쉽게 얘기하면 **하나의 컴퓨터**를 의미한다. 

### ✅ EC2(Elastic Compute Cloud)를 왜 배울까?

서버를 배포하기 위해서는 컴퓨터가 필요하다. 내가 가진 컴퓨터에서 서버를 배포해 다른 사용자들이 인터넷을 통해 접근할 수 있게 만들 수도 있다. 하지만 내 컴퓨터로 서버를 배포하면 24시간 동안 컴퓨터를 켜놔야 한다. 그리고 인터넷을 통해 내 컴퓨터에 접근할 수 있게 만들다보니 보안적으로도 위험할 수도 있다.  

이러한 불편함 때문에 내가 가지고 있는 컴퓨터를 사용하지 않고, AWS EC2라는 컴퓨터를 빌려서 사용하는 것이다. 이 외에도 AWS EC2는 여러 부가기능들(로깅, 오토스케일링, 로드밸런싱 등)을 많이 가지고 있다. 

### ✅ 현업에서는 ?

현업에서도 실제 서버를 배포할 때 AWS EC2를 아주 많이 사용한다. **백엔드 서버를 배포**해야 할 때면 EC2에 서버를 배포해서 사용한다. 

> **“그러면 프론트엔드 웹 페이지를 배포할 때는 AWS EC2를 사용하지 않는걸까?”**
> 

프론트엔드 웹 페이지를 배포할 때 AWS EC2를 사용할 수도 있다. 하지만 AWS EC2보다 vercel, netlify 또는 AWS S3를 사용해서 주로 배포한다. 이게 어떤 것들인지 모를 경우 **“AWS EC2는 백엔드 서버를 배포할 때 주로 사용하는구나“**라고만 기억해도 괜찮다.


# [실습] 1. 리전(Region) 선택하기

### ✅ **AWS EC2 서비스로 들어가서 리전(Region) 선택하기**

![image](https://github.com/user-attachments/assets/433ca8df-2f89-4b29-ba76-93a20b3c68b4)


AWS EC2를 시작하기 위해서는 우선적으로 리전(Region)을 먼저 선택해야 한다. 

### ✅ 리전(Region)이란?

리전(Region)이란 **인프라를 지리적으로 나누어 배포한 각각의 데이터 센터**를 의미한다. 

![image](https://github.com/user-attachments/assets/7d83d0de-d1ae-4c89-8f06-1444a3b031b1)


말이 어렵다. 조금 더 쉽게 풀어서 EC2에 대입해서 생각해보자. 우린 EC2가 **컴퓨터를 빌려서 원격으로 접속해 사용하는 서비스**라는 걸 알고 있다. 여기서 EC2를 통해 빌려서 쓸 수 있는 컴퓨터들이 전 세계적으로 다양하게 분포해있다. 이렇게 컴퓨터들이 위치한 위치를 보고 AWS에서는 **리전(Region)**이라고 한다. 

### ✅ 리전(Region)의 특징

1. **AWS는 전 세계적으로 다양한 Region을 보유하고 있다.** 
    
    ![image](https://github.com/user-attachments/assets/2d2712a1-2e4d-42a0-bb0c-16778fbcef8e)

    
2. **각 Region은 고유의 이름을 가지고 있다.** 
    - ex) `us-east-1`, `eu-west-3`
    
    ![image](https://github.com/user-attachments/assets/5f2d4845-9966-4595-a389-81584433b551)

    

### ✅ 리전(Region)은 어떤 기준으로 선택할까?

사람들이 애플리케이션을 사용할 때는 네트워크를 통해 통신하게 된다. 이 때, 사용자의 위치와 애플리케이션을 실행시키고 있는 컴퓨터와 위치가 멀면 멀수록 속도가 느려진다. 따라서 **애플리케이션의 주된 사용자들의 위치와 지리적으로 가까운 리전(Region)을 선택하는 것이 유리**하다. 

예를 들어, 한국 유저들이 주로 사용하는 서비스를 만들거라면 리전(Region)을 **아시아 태평양(서울)**로 선택하면 된다. 

### ✅ 많이 하는 실수

**아시아 태평양(서울)** 리전에서 EC2를 생성해놓고, 실수로 **미국 동부(버지니아 북부) 리전**에 들어가서 생성한 EC2가 없어졌다고 당황하는 경우가 있다. 

리전(Region)마다 EC2가 따로따로 관리가 되고 있으니 이 점 유의하자.


# [실습] 2. EC2 셋팅하기 - 기본 설정

### ✅ 1. 이름 및 태그

![image](https://github.com/user-attachments/assets/a125a0cd-7a38-48c5-bec2-144e16c2331d)


EC2의 이름을 설정하는 곳이다. 이름을 지을 때는 이 컴퓨터가 어떤 역할을 하는 지 알아볼 수 있게 작성한다. 

ex) `instagram-server`

### ✅ 2. Application and OS Images (Amazon Machine Image)

**Ubuntu 22.04 LTS 선택**

![image](https://github.com/user-attachments/assets/bb75cc62-aac0-4eaf-b012-aee92a126364)


OS를 선택하는 단계이다. OS(운영체제)란 Mac, Windows 7, Windows 10, Windows 11 같은 것들이 OS이다. 하지만 Windows나 Mac OS는 생각보다 용량도 많이 차지하고 성능도 많이 잡아먹는다. 그래서 서버를 배포할 컴퓨터의 OS는 훨씬 가벼운 **Ubuntu**를 많이 사용한다. 

### ✅ 3. 인스턴스 유형

우선 **인스턴스**라는 뜻부터 정리하고 가자. **인스턴스**란, **AWS EC2에서 빌리는 컴퓨터 1대를 의미**한다. 

그럼 **인스턴스 유형**은 무슨 뜻일까? **컴퓨터 사양을 의미**한다. 컴퓨터 사양이 좋으면 좋을수록 많은 수의 요청을 처리할 수 있고, 무거운 서버나 프로그램을 돌릴 수 있다. 

프리 티어에 해당하는 **t2.micro**를 사용할 것이다. 

여기서 많이들 오해하는 게 **t2.micro**는 학습할 때나 테스트할 때만 쓰는 안 좋은 사양의 컴퓨터라고 생각한다. 하지만 실제 서비스에서 활용해도 될 정도로 나름 괜찮은 사양이다. 하루 방문자 수가 2,000명 정도였던 서비스를 운영했었는데 문제 없이 잘 돌아갔다. 성능에 문제가 직접적으로 생기기 전까지는 너무 걱정하지 말자. 

### ✅ 4. **키 페어(로그인)**

키 페어(Key Pair)는 무슨 뜻일까? EC2 컴퓨터에 접근할 때 사용하는 비밀번호라고 생각하면 된다. 말 그대로 열쇠(Key, 키)의 역할을 한다.

![image](https://github.com/user-attachments/assets/5f9127c2-3f19-4e11-82cf-de6bdd8fdb8b)


- **키 페어 이름**은 어떤 EC2에 접근하기 위한 키 페어였는 지 알아볼 수 있게 지정하면 좋다.
- `RSA`와 `.pem`을 선택한 후에 키 페어를 생성하면 된다. `ED25519`가 뭔지, `.ppk`가 뭔지는 몰라도 된다. 중요하지 않다.
- 키 페어를 생성하면 파일이 하나 다운받아질텐데, 그 파일은 잃어버리면 안 되니 잘 보관해놔야 한다.
- **참고)** 실습에서는 `키 페어`를 활용해서 EC2에 접근하지 않고, 더 편한 방법으로 접근할 예정이다.

# [실습] 3. EC2 셋팅하기 - 보안그룹 설정

### ✅ **네트워크 설정**

![image](https://github.com/user-attachments/assets/33dbe189-74d5-4a41-8920-0865eae4c1dc)

네트워크 설정 칸을 보면 **VPC**와 **Security Groups(보안 그룹)**가 보인다. 여기서 VPC라는 개념은 AWS를 입문하는 입장에서는 크게 중요하지 않으니 넘어가자. 나중에 AWS에 어느 정도 익숙해졌을 때 VPC를 학습하도록 하자. VPC를 몰라도 서버를 배포하는 데 아무 문제가 없다. 

하지만 **Security Groups(보안 그룹)**은 서버를 배포할 때 중요한 개념이므로 자세히 알아보자. 

### ✅ 보안 그룹(Security Group)이란?

**보안 그룹(Security Group)**이란 **AWS 클라우드에서의 네트워크 보안**을 의미한다. 

![image](https://github.com/user-attachments/assets/fbb66398-1a61-4e7e-9388-bc226d7d69ec)


**EC2 인스턴스**를 **집**이라고 생각한다면, **보안 그룹**은 **집 바깥 쪽에 쳐져있는 울타리와 대문**이라고 생각하면 된다. 집에 접근할 때 울타리의 대문에서 접근해도 되는 요청인지 보안 요원이 검사를 하는 것과 비슷하다. 

인터넷에서 일부 사용자가 EC2 인스턴스에 접근(액세스)하려고 한다고 가정해보자. 위 그림과 같이 EC2 인스턴스 주위에 방화벽 역할을 할 **보안 그룹(Security Group)**을 만들고 보안 그룹에 규칙을 지정한다. 이 보안 규칙에는 **인바운드 트래픽(즉, 외부에서 EC2 인스턴스로 보내는 트래픽)**에서 어떤 트래픽만 허용할 지 설정할 수 있고, **아웃바운드 트래픽(즉, EC2 인스턴스에서 외부로 나가는 트래픽)**에서 어떤 트래픽만 허용할 지 설정할 수 있다. 

보안 그룹을 설정할 때는 허용할 **IP 범위**와 **포트(port)**를 설정할 수 있다. 

> **그러면 EC2 인스턴스를 생성할 때 어떻게 보안 그룹(Security Group)을 설정해야 하는 지 알아보자.**
> 

### ✅ **보안그룹 설정**

외부에서 EC2로 접근할 포트는 **22번 포트**와 **80번 포트**라고 생각해서 이 2가지에 대해 인바운드 보안 그룹 규칙을 추가했다. 왜냐하면 22번 포트는 우리가 EC2에 원격 접속할 때 사용하는 포트이고, 80번 포트에는 백엔드 서버를 띄울 예정이기 때문이다. 그리고 어떤 IP에서든 전부 접근할 수 있게 만들기 위해 소스 유형은 **위치 무관**으로 설정했다.

![image](https://github.com/user-attachments/assets/e9271789-138a-4000-b24a-62476d477317)


# [실습] 4. EC2 셋팅하기 - 스토리지 구성

### ✅ **스토리지 구성**

![image](https://github.com/user-attachments/assets/fabf152c-8479-4dc7-bce9-76030f9c904d)


![image](https://github.com/user-attachments/assets/2318623f-a1af-48a5-a531-69949cf24730)



우리가 쓰고 있는 노트북이나 데스크톱 컴퓨터는 전부 하드디스크를 가지고 있다. 하드디스크는 컴퓨터에서 파일을 저장하는 공간이다. EC2도 하나의 컴퓨터이다보니 여러 파일들을 저장할 저장 공간이 필요하다. 이 저장 공간을 보고 **EBS(Elastic Block Storage)**라고 부른다. 즉, EBS란 EC2 안에 부착되어 있는 일종의 하드디스크라고 생각하면 된다. EBS와 같은 저장 공간을 조금 더 포괄적인 용어로 **스토리지(Storage)**, **볼륨(Volume)**이라고 부른다. 

### ✅ **셋팅**

![image](https://github.com/user-attachments/assets/50f98640-7d31-4af2-b364-776620178d61)

스토리지의 종류를 보면 gp3 이외에도 여러가지 종류의 스토리지가 있다. 하지만 가성비가 좋은 **gp3**를 선택해주자. 용량을 **30GiB**를 설정한 이유는 프리 티어에서 30GiB까지 무료로 제공해주기 때문이다. 이 스토리지의 크기는 추후에 늘릴 수도 있으므로 처음 설정할 때 너무 큰 고민을 할 필요는 없다.

# [실습] 5. EC2 접속하기

### ✅ 생성된 인스턴스 정보 해석하기

1. **세부 정보**
    
    ![image](https://github.com/user-attachments/assets/16030b59-2a7d-471b-b9fa-de89afcc7f3c)

    
    세부 정보에서 눈여겨 봐야 할 부분은 2가지 밖에 없다. **퍼블릭 IPv4 주소**와 **인스턴스 상태**이다. 
    
    - **퍼블릭 IPv4 주소**는 EC2 인스턴스가 생성되면서 부여받은 IP 주소이다. EC2 인스턴스에 접근하려면 이 IP 주소로 접근하면 된다.
    - **인스턴스 상태**는 말그대로 EC2 인스턴스가 **실행 중**이라는 뜻은 컴퓨터가 켜져있다는 뜻이다.
        
        ![image](https://github.com/user-attachments/assets/d448038b-b3b3-45d7-93c8-eedbff66bd2e)

        
        EC2 인스턴스를 **중지**, **재부팅**, **종료**도 할 수 있다. 우리가 쓰는 컴퓨터와 아주 유사하다. **재부팅**은 말그대로 컴퓨터를 재시작시키는 걸 의미하고, **중지**는 컴퓨터를 잠시 꺼놓는 걸 의미한다. **종료**는 컴퓨터를 아예 삭제시킨다는 걸 의미한다. **EC2 인스턴스를 한 번 종료하면 도중에 취소할 수 없으니 조심해야 한다.** 
        
2. **보안 (보안 그룹)**
    
    ![image](https://github.com/user-attachments/assets/660f7d89-9111-41e5-b2a7-3a93ff6ad4dc)

    
    인스턴스 생성 시 설정한 보안 그룹에 대한 정보가 나온다. 
    

1. **네트워크**
    
    ![image](https://github.com/user-attachments/assets/82ddfc55-6ba9-409f-a33a-61a9db3fe3a0)

    
    퍼블릭 IPv4 주소는 생성한 EC2 인스턴스의 IP 주소를 뜻한다. 
    

1. **스토리지**
    
    ![image](https://github.com/user-attachments/assets/e6d3eab2-faae-4ed5-81d4-9066293b0d8c)

    
    인스턴스 생성 시 설정한 스토리지에 대한 정보가 나온다. 
    
2. **상태 검사**
    
    (잘 안 보는 창이다.)
    
3. **모니터링**
    
    EC2 인스턴스에 관련한 여러가지 정보를 볼 수 있는 창이다. AWS를 처음 입문할 때는 자주 볼 일이 없는 창이지만, 나중에 **실제 서버를 운영할 때는 자주 보게되는 창**이다. EC2 인스턴스가 정상적으로 작동하고 있는 지, EC2 인스턴스의 성능을 향상시켜주어야 하는 건 아닌 지 아래 지표를 통해 파악할 수 있다. 
    
    ![image](https://github.com/user-attachments/assets/6de947ac-5773-49e1-8381-6088b7cbb417)

    

1. **태그**
    
    (잘 안 보는 창이다.)
    
    ![image](https://github.com/user-attachments/assets/a9eed1b0-cc71-4a8f-bc6d-5e51b55214da)

    

### ✅ **EC2에 접속하기**

![image](https://github.com/user-attachments/assets/9d938b71-6d9b-446e-94e9-39eb6b37c8b8)


# [실습] 6. 탄력적 IP 연결하기

### ✅ 탄력적 IP가 왜 필요할까?

EC2 인스턴스를 생성하면 IP를 할당받는다. 하지만 이렇게 할당받은 IP는 임시적인 IP이다. EC2 인스턴스를 잠깐 중지시켰다가 다시 실행시켜보면 IP가 바뀌어있다. EC2 인스턴스를 중지시켰다가 다시 실행시킬 때마다 IP가 바뀌면 굉장히 불편하다. 그래서 중지시켰다가 다시 실행시켜도 바뀌지 않는 고정 IP를 할당받아야 한다. 

> 그게 바로 **탄력적 IP**이다.
> 

현업에서도 EC2 인스턴스를 생성하면 탄력적 IP를 대부분 필수적으로 설정한다. 

### ✅ 탄력적 IP 설정 방법

![image](https://github.com/user-attachments/assets/66d6e3c9-907c-49dc-b099-7d032f4b0c06)
