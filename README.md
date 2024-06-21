Chat App using React + Vite + Antd Design + CSS + Server socket
Author: Trần Ngọc Thắng
Demo:

I. Phần đã làm

- Hiển thị được giao diện Chat .
- Khi một người vào trình duyệt chat ta sẽ xem xem người đó có useKey chưa, nếu không có chúng ta sẽ random 1 userKey mới trong localStorage ứng với người dùng đó.
- Hiển thị được danh sách người chat.
- Khi có một người vào phòng sẽ hiển thị bên UserList và avatar của người đó bên góc phải.
- Khi 2 người chat với nhau thì người gửi sẽ chat tin nhắn và hiển thị góc phải WinDow Chat và khi có tin nhắn tới thì sẽ ở góc trái
- Tin nhắn sẽ được lưu vào localStorage "messages" và "chatHistory" để khi người dùng reload lại trang vẫn còn tin nhắn
- Các tin nhắn là được riêng ứng với từng user

- Hiển thị từ người gửi sang người nhận userKey bị lỗi hiển thị

  II. Thực hiện

Set up
Server:
npm install
-cd server sau đó dùng câu lệnh : node serverChat.js
Client:
npm install
-Chạy client bằng cách npm run dev => [localhost](http://localhost:5173/)

Component:

ListUser, Message,SideBar,WindowChat,User

Deploy Github Pages

Upload to github
npm install --save gh-pages
Setup domain in github
Setup domain in vite.config
npm run deploy
Demo:
