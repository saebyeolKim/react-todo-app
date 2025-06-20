# 🐧 Ubuntu 18.04 환경에서 Docker 설치 및 커널 실험 기록

## 📌 목표

* Ubuntu 18.04 호스트에서 Docker 설치
* Docker 컨테이너에 Ubuntu 22.04 이미지 실행
* 컨테이너가 호스트 커널을 그대로 사용하는지 확인

---

## ✅ 1. Docker 설치 (Ubuntu 18.04)

### 🔹 필수 패키지 설치

```bash
sudo apt update
sudo apt install ca-certificates curl gnupg lsb-release -y
```

### 🔹 GPG 키 등록

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

### 🔹 Docker 저장소 추가

```bash
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu bionic stable" | sudo tee /etc/apt/sources.list.d/docker.list
```

### 🔹 패키지 인덱스 업데이트 및 Docker 설치

```bash
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io -y
```

---

## ✅ 2. Docker 권한 설정 (선택)

```bash
sudo usermod -aG docker $USER
```

> 이후 로그아웃 후 재로그인 또는 `newgrp docker` 실행

---

## ✅ 3. 컨테이너에서 커널 확인 실험

### 🔹 컨테이너 실행

```bash
sudo docker run -it ubuntu:22.04 /bin/bash
```

> `/bin/bash` 오타 주의 (`/bin/hash` ❌)

### 🔹 컨테이너 내부에서 커널 버전 확인

```bash
uname -r
```

#### ✅ 실험 결과 예시:

```
4.15.0-213-generic
```

→ 호스트 커널과 동일 = Docker 컨테이너는 커널을 공유한다는 것 확인

---

## ❗ 주요 문제 해결 요약

| 문제                                      | 해결 방법                                                   |
| --------------------------------------- | ------------------------------------------------------- |
| DNS 오류 (`curl: Could not resolve host`) | `/etc/resolv.conf` 에 `nameserver 8.8.8.8` 설정            |
| docker-ce 패키지 없음                        | 저장소 파일 정확히 등록 & `sudo apt update` 수행                    |
| Docker 실행 권한 오류                         | `sudo docker` 사용 또는 `usermod -aG docker $USER`          |
| `/bin/hash` 실행 오류                       | 오타. `bash`로 수정                                          |
| `tee`로 저장 안됨                            | `sudo tee ...` 또는 `sudo sh -c 'echo ... > file'` 정확히 사용 |

---

## 🧠 커널(Kernel)이란?

### ▶️ 정의

> 커널(Kernel)은 리눅스 운영체제의 핵심으로, **하드웨어와 소프트웨어를 연결하는 중재자** 역할을 한다.

### ▶️ 커널의 역할

| 역할          | 설명                               |
| ----------- | -------------------------------- |
| 프로세스 관리     | CPU를 어떤 프로그램이 사용할지 결정            |
| 메모리 관리      | 각 프로그램에 메모리 분배 및 보호              |
| 파일 시스템 관리   | 파일 읽기/쓰기 제어                      |
| 디바이스 제어     | 하드디스크, USB 등 장치 제어               |
| 시스템 콜 인터페이스 | `open()`, `read()` 같은 요청을 커널에 전달 |
| 보안          | 사용자/프로세스 권한 분리 및 제어              |

### ▶️ Docker와 커널의 관계

* Docker는 **호스트 커널을 그대로 공유**
* 컨테이너가 아무리 Ubuntu 22.04여도, 내부의 커널은 여전히 **호스트의 커널 버전**

#### ✅ 실험 결과의 의미:

* `uname -r` → `4.15.0-213-generic`
* 호스트와 동일 → Docker는 자체 커널이 없다 = 격리 안 됨

---

## 🏁 결론

* Docker는 격리된 환경처럼 동작하지만 커널은 공유된다
* **최신 커널 기능 테스트나 시스템 호환성 테스트는 호스트 커널이 좌우**함
* 커널 버전이 중요할 경우 **Docker 위 컨테이너 테스트만으로는 부족할 수 있음** → 실제 호스트 마이그레이션 필요

---

**작성자 실험 완료일: 2025년 6월**

> 이 문서는 실제 Ubuntu 18.04 + Docker 환경에서 발생한 문제와 해결 과정을 기반으로 작성되었습니다.
