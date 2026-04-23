# Dokumentasi Linux, Docker, dan Jaringan

---

## a. Perbedaan antara Linux Kernel dan Distro

### Linux Kernel
**Linux Kernel** adalah inti dari sistem operasi Linux. Kernel bertugas sebagai jembatan antara perangkat keras (hardware) dan perangkat lunak (software). Kernel mengelola sumber daya sistem seperti CPU, memori, dan perangkat I/O.

**Fungsi utama Kernel:**
- Manajemen proses (scheduling, forking)
- Manajemen memori (RAM, virtual memory)
- Manajemen perangkat keras melalui driver
- Manajemen sistem file
- Manajemen jaringan

### Linux Distro (Distribusi)
**Linux Distro** adalah sistem operasi lengkap yang dibangun di atas Linux Kernel, dilengkapi dengan berbagai perangkat lunak tambahan seperti shell, package manager, GUI, dan utilitas sistem.

### Perbandingan

| Aspek | Linux Kernel | Linux Distro |
|---|---|---|
| Definisi | Inti sistem operasi | Paket OS lengkap |
| Pengembang | Linus Torvalds & komunitas | Berbagai organisasi/komunitas |
| Contoh | Linux 6.x | Ubuntu, Fedora, Arch Linux |
| Fungsi | Mengelola hardware | Menyediakan lingkungan pengguna |
| Versi | Satu versi resmi | Ratusan distro berbeda |

### Contoh Distro Populer
- **Ubuntu** – cocok untuk pemula, berbasis Debian
- **CentOS / AlmaLinux** – untuk server enterprise
- **Arch Linux** – untuk pengguna mahir, rolling release
- **Kali Linux** – untuk keamanan dan penetration testing
- **Fedora** – cutting-edge, disponsori Red Hat

---

## b. Linux FHS (Filesystem Hierarchy Standard)

**FHS** adalah standar yang mendefinisikan struktur direktori dan isi direktori dalam sistem Linux/Unix. Tujuannya agar sistem file konsisten di berbagai distro.

### Struktur Direktori Utama

| Direktori | Nama Lengkap | Kegunaan | Contoh Isi |
|---|---|---|---|
| `/` | Root | Direktori paling atas, induk semua direktori | Semua direktori lainnya |
| `/bin` | Binaries | Program esensial untuk semua user | `ls`, `cp`, `mv`, `cat` |
| `/sbin` | System Binaries | Program esensial untuk administrator | `fdisk`, `iptables`, `reboot` |
| `/etc` | Et Cetera | File konfigurasi sistem | `passwd`, `hosts`, `nginx.conf` |
| `/home` | Home | Direktori personal setiap user | `/home/budi`, `/home/sari` |
| `/root` | Root Home | Direktori home untuk user root | File pribadi superuser |
| `/var` | Variable | Data yang sering berubah | Log, database, cache |
| `/tmp` | Temporary | File sementara, dihapus saat reboot | File upload sementara |
| `/usr` | Unix System Resources | Program dan data untuk semua user | `/usr/bin`, `/usr/lib` |
| `/lib` | Libraries | Library bersama untuk `/bin` dan `/sbin` | `libc.so`, modul kernel |
| `/dev` | Devices | File representasi perangkat keras | `/dev/sda`, `/dev/null` |
| `/proc` | Process | Informasi proses dan kernel (virtual) | `/proc/cpuinfo`, `/proc/meminfo` |
| `/sys` | System | Informasi hardware dan kernel (virtual) | Interface kernel modern |
| `/mnt` | Mount | Titik mount sementara | Mount USB, NFS |
| `/media` | Media | Mount otomatis media removable | `/media/usb`, `/media/cdrom` |
| `/opt` | Optional | Software tambahan pihak ketiga | `/opt/google`, `/opt/zoom` |
| `/boot` | Boot | File untuk proses booting | Kernel image, GRUB |

### Contoh Penggunaan

```bash
# Melihat konfigurasi jaringan
cat /etc/hosts

# Melihat log sistem
tail -f /var/log/syslog

# Melihat informasi CPU
cat /proc/cpuinfo

# Melihat daftar user
cat /etc/passwd

# Melihat perangkat disk
ls /dev/sd*
```

---

## c. Sistem Permission dan Owner pada Linux

Linux menggunakan sistem permission berbasis **User-Group-Other (UGO)** untuk mengontrol akses terhadap file dan direktori.

### Jenis Permission

| Symbol | Angka | Arti pada File | Arti pada Direktori |
|---|---|---|---|
| `r` | 4 | Baca isi file | Lihat daftar isi direktori |
| `w` | 2 | Tulis/ubah file | Buat/hapus file di dalam direktori |
| `x` | 1 | Eksekusi file | Masuk ke dalam direktori |
| `-` | 0 | Tidak ada izin | Tidak ada izin |

### Struktur Permission

```
-rwxr-xr--  1  budi  developers  4096  Apr 22 10:00  script.sh
│└──┴──┴──  │  └──┘  └────────┘
│ │  │  │   │   │       │
│ │  │  │   │   Owner   Group
│ │  │  │   Jumlah hard link
│ │  │  └── Permission Other (r--)
│ │  └───── Permission Group (r-x)
│ └──────── Permission Owner (rwx)
└────────── Tipe file (- = file biasa, d = direktori, l = symlink)
```

### Tipe Owner

- **Owner (User)** – pemilik file
- **Group** – kelompok yang memiliki akses
- **Other** – semua pengguna lain

### Contoh Penggunaan

```bash
# Melihat permission file
ls -l file.txt
# Output: -rw-r--r-- 1 budi developers 1024 Apr 22 script.sh

# Mengubah permission dengan symbolic
chmod u+x script.sh       # Tambah execute untuk owner
chmod g-w file.txt        # Hapus write untuk group
chmod o=r file.txt        # Set other hanya bisa read

# Mengubah permission dengan angka (octal)
chmod 755 script.sh       # rwxr-xr-x
chmod 644 file.txt        # rw-r--r--
chmod 600 private.key     # rw-------

# Mengubah owner
chown budi file.txt
chown budi:developers file.txt

# Mengubah group
chgrp developers file.txt

# Rekursif (seluruh direktori)
chmod -R 755 /var/www/html
chown -R www-data:www-data /var/www/html
```

### Tabel Octal Permission Umum

| Octal | Symbolic | Penggunaan Umum |
|---|---|---|
| `777` | `rwxrwxrwx` | Semua akses (hindari!) |
| `755` | `rwxr-xr-x` | Script, direktori publik |
| `644` | `rw-r--r--` | File konten biasa |
| `600` | `rw-------` | File private (SSH key) |
| `400` | `r--------` | Read-only sensitif |

---

## d. Prinsip Enkripsi pada SSH

**SSH (Secure Shell)** adalah protokol jaringan yang memungkinkan komunikasi terenkripsi antara client dan server. SSH menggunakan beberapa lapisan enkripsi untuk menjamin keamanan.

### Prinsip Enkripsi SSH

#### 1. Asymmetric Encryption (Kunci Publik-Privat)
Digunakan saat **awal koneksi (handshake)** untuk autentikasi.

```
Client                          Server
  │                               │
  │──── Public Key Request ──────>│
  │<─── Server Public Key ────────│
  │                               │
  │  Enkripsi dengan Public Key   │
  │──── Encrypted Session Key ──>│
  │     Dekripsi dengan Private   │
  │         Key (Server)          │
```

- **Public Key**: Dibagikan ke semua orang, digunakan untuk mengenkripsi
- **Private Key**: Rahasia, hanya dimiliki pemilik, digunakan untuk mendekripsi
- Algoritma umum: **RSA**, **ECDSA**, **Ed25519**

#### 2. Symmetric Encryption
Setelah handshake, digunakan **session key** bersama untuk enkripsi data yang lebih cepat.
- Algoritma umum: **AES-256**, **ChaCha20**

#### 3. Hashing (Integritas Data)
Memastikan data tidak berubah selama transmisi menggunakan **HMAC**.
- Algoritma umum: **SHA-256**, **SHA-512**

### Alur Koneksi SSH

```
1. Client memulai koneksi ke port 22
2. Server mengirim public key (host key)
3. Client memverifikasi identitas server (known_hosts)
4. Negosiasi algoritma enkripsi
5. Pertukaran kunci (key exchange) – Diffie-Hellman
6. Session key simetris dibuat
7. Autentikasi user (password atau SSH key)
8. Sesi terenkripsi dimulai
```

### Contoh Penggunaan SSH

```bash
# Generate SSH key pair
ssh-keygen -t ed25519 -C "email@example.com"
# Menghasilkan: ~/.ssh/id_ed25519 (private) dan ~/.ssh/id_ed25519.pub (public)

# Menyalin public key ke server
ssh-copy-id user@192.168.1.10

# Koneksi ke server
ssh user@192.168.1.10

# Koneksi dengan key tertentu
ssh -i ~/.ssh/id_rsa user@192.168.1.10

# Koneksi dengan port berbeda
ssh -p 2222 user@192.168.1.10

# File konfigurasi SSH client
# ~/.ssh/config
Host myserver
    HostName 192.168.1.10
    User budi
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
```

---

## e. Perbedaan antara HTTP dan HTTPS

### HTTP (HyperText Transfer Protocol)
Protokol komunikasi untuk transfer data di web **tanpa enkripsi**.

### HTTPS (HTTP Secure)
HTTP yang dilindungi oleh **TLS/SSL**, sehingga data dienkripsi selama transmisi.

### Perbandingan

| Aspek | HTTP | HTTPS |
|---|---|---|
| Kepanjangan | HyperText Transfer Protocol | HTTP Secure |
| Port default | 80 | 443 |
| Enkripsi | Tidak ada | TLS/SSL |
| Keamanan | Rentan disadap (MITM) | Aman, terenkripsi |
| Sertifikat | Tidak diperlukan | Memerlukan SSL/TLS Certificate |
| Kecepatan | Sedikit lebih cepat | Sedikit lebih lambat (overhead TLS) |
| SEO | Tidak diutamakan | Diprioritaskan Google |
| Indikator browser | ⚠️ Not Secure | 🔒 Ikon gembok |

### Cara Kerja TLS Handshake pada HTTPS

```
Client                              Server
  │                                   │
  │──── ClientHello ─────────────────>│ (versi TLS, cipher suites)
  │<─── ServerHello + Certificate ────│ (sertifikat SSL)
  │                                   │
  │  Verifikasi sertifikat (CA)        │
  │──── Pre-Master Secret ───────────>│ (dienkripsi public key server)
  │<─── Server Finished ──────────────│
  │──── Client Finished ─────────────>│
  │                                   │
  │════ Komunikasi Terenkripsi ════════│
```

### Contoh Konfigurasi HTTPS di Nginx

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        root /var/www/html;
    }
}

# Redirect HTTP ke HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

---

## f. Docker OCI Compliance Standard

### Apa itu OCI?
**OCI (Open Container Initiative)** adalah organisasi open-source yang dibentuk tahun 2015 oleh Docker dan pemimpin industri lainnya di bawah Linux Foundation. OCI bertujuan membuat **standar terbuka** untuk container agar tidak tergantung pada satu vendor.

### Spesifikasi OCI

| Spesifikasi | Fungsi |
|---|---|
| **Image Spec** | Mendefinisikan format image container (layer, manifest, config) |
| **Runtime Spec** | Mendefinisikan cara menjalankan container (lifecycle, namespace, cgroups) |
| **Distribution Spec** | Mendefinisikan API untuk distribusi image (push/pull ke registry) |

### Manfaat OCI Compliance

1. **Portabilitas** – Image yang dibuat dengan Docker bisa dijalankan di containerd, Podman, atau runtime lain
2. **Interoperabilitas** – Tools berbeda bisa bekerja bersama
3. **Vendor Neutral** – Tidak terkunci pada satu platform
4. **Standarisasi** – Memudahkan pengembangan ekosistem container

### Contoh Runtime OCI-Compliant

```bash
# Docker (menggunakan containerd + runc di balik layar)
docker run nginx

# Podman (OCI-compliant, tanpa daemon)
podman run nginx

# containerd langsung
ctr image pull docker.io/library/nginx:latest
ctr run docker.io/library/nginx:latest mynginx

# Verifikasi OCI compliance image
docker inspect nginx | grep -i "OCI\|schema"
```

### Struktur OCI Image

```
OCI Image
├── manifest.json        ← Daftar layer dan konfigurasi
├── config.json          ← Environment, CMD, entrypoint
└── layers/
    ├── layer1.tar.gz    ← Base OS
    ├── layer2.tar.gz    ← Dependencies
    └── layer3.tar.gz    ← Aplikasi
```

---

## g. Perbedaan antara Container dan VM (Virtual Machine)

### Virtual Machine (VM)
VM mengemulasi **seluruh perangkat keras** termasuk OS lengkap (kernel + userspace) di atas hypervisor.

### Container
Container berbagi **kernel host** dan mengisolasi proses menggunakan fitur kernel Linux (namespace & cgroups).

### Perbandingan Detail

| Aspek | Container | Virtual Machine |
|---|---|---|
| Isolasi | Proses (namespace) | Hardware penuh |
| Kernel | Berbagi kernel host | Kernel sendiri |
| OS | Tidak perlu OS penuh | OS lengkap per VM |
| Ukuran | MB (ringan) | GB (berat) |
| Startup | Detik | Menit |
| Performa | Mendekati native | Overhead hypervisor |
| Resource | Efisien | Lebih boros |
| Keamanan | Isolasi lebih lemah | Isolasi lebih kuat |
| Use Case | Microservices, CI/CD | Multi-OS, legacy app |
| Contoh | Docker, Podman | VMware, VirtualBox, KVM |

### Ilustrasi Arsitektur

```
┌─────────────────────────────────────┐
│           VIRTUAL MACHINE           │
│  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │App A │  │App B │  │App C │      │
│  ├──────┤  ├──────┤  ├──────┤      │
│  │ OS   │  │ OS   │  │ OS   │      │
│  └──────┘  └──────┘  └──────┘      │
│        Hypervisor (VMware/KVM)      │
│           Host OS / Hardware        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│              CONTAINER              │
│  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │App A │  │App B │  │App C │      │
│  ├──────┤  ├──────┤  ├──────┤      │
│  │ Libs │  │ Libs │  │ Libs │      │
│  └──────┘  └──────┘  └──────┘      │
│         Container Engine (Docker)   │
│         Host OS Kernel (Shared)     │
│              Hardware               │
└─────────────────────────────────────┘
```

---

## h. Definisi dan Manfaat Image Layer pada Docker

### Apa itu Image Layer?
Docker image dibangun dari **sekumpulan layer** yang bersifat **read-only** dan ditumpuk satu di atas yang lain. Setiap instruksi dalam `Dockerfile` (RUN, COPY, ADD) menciptakan layer baru.

### Cara Kerja Layer

```
┌─────────────────────────────┐  ← Layer 4: COPY app /app (R/W saat run)
├─────────────────────────────┤  ← Layer 3: RUN pip install -r requirements.txt
├─────────────────────────────┤  ← Layer 2: RUN apt-get install python3
├─────────────────────────────┤  ← Layer 1: FROM ubuntu:22.04 (Base Image)
└─────────────────────────────┘
```

### Manfaat Image Layer

1. **Efisiensi Storage** – Layer yang sama di-share antar image, tidak disimpan duplikat
2. **Caching Build** – Layer yang tidak berubah di-cache, mempercepat proses build
3. **Reusability** – Base layer (Ubuntu, Python) dipakai ulang oleh banyak image
4. **Incremental Update** – Hanya layer yang berubah yang perlu didownload/diupload

### Contoh Dockerfile dan Layer-nya

```dockerfile
# Layer 1: Base image
FROM ubuntu:22.04

# Layer 2: Update package list
RUN apt-get update

# Layer 3: Install nginx
RUN apt-get install -y nginx

# Layer 4: Copy konfigurasi
COPY nginx.conf /etc/nginx/nginx.conf

# Layer 5: Copy aplikasi
COPY ./app /var/www/html

# Tidak membuat layer baru
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Melihat layer sebuah image
docker history nginx

# Melihat detail layer
docker inspect nginx | jq '.[0].RootFS.Layers'

# Build dengan cache
docker build -t myapp .

# Build tanpa cache
docker build --no-cache -t myapp .
```

### Best Practice Layer

```dockerfile
# ❌ Buruk – setiap RUN membuat layer terpisah
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git

# ✅ Baik – gabungkan dalam satu RUN
RUN apt-get update && \
    apt-get install -y curl git && \
    rm -rf /var/lib/apt/lists/*
```

---

## i. Kegunaan Docker Volume dan Network beserta Contohnya

### Docker Volume

**Volume** adalah mekanisme untuk menyimpan data yang **persisten** di luar container. Data di dalam container hilang saat container dihapus, volume mengatasi masalah ini.

#### Jenis Penyimpanan Data di Docker

| Jenis | Lokasi | Use Case |
|---|---|---|
| **Volume** | Dikelola Docker (`/var/lib/docker/volumes`) | Data persisten, database |
| **Bind Mount** | Direktori host tertentu | Development, config file |
| **tmpfs Mount** | RAM (tidak persisten) | Data sensitif sementara |

#### Contoh Penggunaan Volume

```bash
# Membuat volume
docker volume create mydata

# Melihat daftar volume
docker volume ls

# Menjalankan container dengan volume
docker run -d \
  --name mysql-db \
  -v mydata:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  mysql:8.0

# Bind mount (development)
docker run -d \
  --name webapp \
  -v $(pwd)/src:/app/src \
  node:18

# Melihat detail volume
docker volume inspect mydata

# Menghapus volume
docker volume rm mydata

# Hapus semua volume yang tidak dipakai
docker volume prune
```

#### Contoh di Docker Compose

```yaml
services:
  db:
    image: postgres:15
    volumes:
      - pgdata:/var/lib/postgresql/data   # Named volume
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Bind mount

volumes:
  pgdata:   # Deklarasi named volume
```

---

### Docker Network

**Network** memungkinkan container berkomunikasi satu sama lain atau dengan dunia luar secara terisolasi dan terkontrol.

#### Jenis Network Docker

| Driver | Kegunaan | Contoh |
|---|---|---|
| **bridge** | Default, komunikasi antar container di host yang sama | Aplikasi multi-container lokal |
| **host** | Container berbagi network host langsung | Performa tinggi, tanpa isolasi jaringan |
| **none** | Tanpa network | Container yang butuh isolasi penuh |
| **overlay** | Komunikasi antar host (Docker Swarm) | Cluster multi-node |
| **macvlan** | Container punya MAC address sendiri | Legacy apps yang butuh IP fisik |

#### Contoh Penggunaan Network

```bash
# Membuat custom network
docker network create mynetwork

# Melihat daftar network
docker network ls

# Menjalankan container dalam network
docker run -d \
  --name backend \
  --network mynetwork \
  myapp-backend

docker run -d \
  --name frontend \
  --network mynetwork \
  myapp-frontend

# Container dalam network yang sama bisa saling ping dengan nama
docker exec frontend ping backend

# Menghubungkan container ke network yang sudah ada
docker network connect mynetwork existing-container

# Melihat detail network
docker network inspect mynetwork
```

#### Contoh di Docker Compose

```yaml
services:
  web:
    image: nginx
    ports:
      - "80:80"
    networks:
      - frontend

  app:
    image: myapp
    networks:
      - frontend
      - backend

  db:
    image: postgres
    networks:
      - backend   # Hanya bisa diakses dari 'app', tidak dari 'web'

networks:
  frontend:
  backend:
    internal: true  # Tidak bisa akses internet
```

---

## j. Definisi dan Tujuan Penggunaan Web Server dan Reverse Proxy

### Web Server

**Web Server** adalah perangkat lunak yang menerima request HTTP/HTTPS dari client (browser) dan mengirimkan response berupa file statis (HTML, CSS, JS, gambar) atau meneruskan request ke aplikasi backend.

#### Contoh Web Server Populer

| Web Server | Keunggulan |
|---|---|
| **Nginx** | Performa tinggi, event-driven, efisien untuk koneksi banyak |
| **Apache** | Fleksibel, modul banyak, .htaccess support |
| **Caddy** | Auto HTTPS, konfigurasi mudah |
| **LiteSpeed** | Performa tinggi, kompatibel Apache |

#### Contoh Konfigurasi Nginx sebagai Web Server

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/html;
    index index.html index.htm;

    # Melayani file statis
    location / {
        try_files $uri $uri/ =404;
    }

    # Cache untuk aset statis
    location ~* \.(jpg|jpeg|png|css|js)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

---

### Reverse Proxy

**Reverse Proxy** adalah server perantara yang menerima request dari client dan **meneruskannya ke server backend** yang sesuai, lalu mengembalikan response ke client. Client tidak mengetahui server backend yang sebenarnya.

#### Ilustrasi Alur

```
Client (Browser)
      │
      │ Request: https://example.com/api
      ▼
┌─────────────┐
│ Reverse     │
│ Proxy       │  ────────────────────────────────────────────┐
│ (Nginx)     │  ──────────────────────────┐                 │
└─────────────┘                            │                 │
                                           ▼                 ▼
                                   ┌──────────────┐  ┌──────────────┐
                                   │ Backend App  │  │ Backend App  │
                                   │ (Node.js)    │  │ (Python)     │
                                   │ :3000        │  │ :5000        │
                                   └──────────────┘  └──────────────┘
```

#### Tujuan Penggunaan Reverse Proxy

| Tujuan | Penjelasan |
|---|---|
| **Load Balancing** | Mendistribusikan traffic ke beberapa server backend |
| **SSL Termination** | Menangani HTTPS di satu titik, backend pakai HTTP biasa |
| **Keamanan** | Menyembunyikan server backend dari internet |
| **Caching** | Menyimpan response agar tidak selalu hit backend |
| **Compression** | Kompres response (gzip) sebelum dikirim ke client |
| **Rate Limiting** | Membatasi jumlah request per IP |
| **Routing** | Mengarahkan URL berbeda ke service berbeda |

#### Contoh Konfigurasi Nginx sebagai Reverse Proxy

```nginx
# Upstream backend servers
upstream backend_pool {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}

server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    # Routing berdasarkan path
    location /api/ {
        proxy_pass http://backend_pool;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        root /var/www;
        expires 7d;
    }

    location / {
        proxy_pass http://127.0.0.1:8080;  # Frontend app
    }
}
```

#### Contoh dengan Docker Compose (Full Stack)

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

  app:
    image: myapp:latest
    expose:
      - "3000"   # Tidak di-publish ke host, hanya internal
    networks:
      - internal

  db:
    image: postgres:15
    networks:
      - internal

networks:
  internal:
```

---

