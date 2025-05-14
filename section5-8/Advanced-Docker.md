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
