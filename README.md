# API-SERVER 
ในส่วนของ api-server จะเป็น part แรก ของการสร้างเว็บ kmitl-hospital โดยตัว repo นี้จะมีหน้าเป็น server ไว้คุยระหว่าง database กับ backend-server ซึ่งให้เพื่อนๆ ไปสร้าง database ไว้ก่อน โดยมีลำดับการสร้างดังนี้

0. ติดตั้ง module โดยใช้คำสั่ง ```npm i``` (มันไปเอาชื่อ module มาติดตั้งให้จาก 'package.json' ส่วนไฟล์ 'package-lock.json' มีหน้าที่ ล็อค vesion ให้คนอื่นที่ไปติดตั้งต้องใช้ version เดียวกันกับเจ้าของ [สามารถลบไฟล์ 'package-lock.json' ทิ้งได้])
1. นำสคริปต์ 'dump_script.sql' ไปสร้าง database ใหม่ชื่อ hospital_db
2. เชื่อมต่อกับ database ที่ไฟล์ ConnectDB.js
3. เปิด server โดยใช้คำสั่ง ```npm start``` (มันไปรัน script ที่อยู่ใน 'package.json' ที่ฟิลด์ของ 'start')
4. ให้ลองยิง postman ที่ url ```localhost:3030/employee``` เพื่อดูว่าสร้างสำเร็จไหม

# FYI
หากต้องการใช้ docker ก็ไปรัน สคริปด์ที่อยู่ใน Dockerfile ซึ่งถ้าหากรันโดดๆ ก็ไม่มีไรเกิดขึ้น

# Problem & Fix
- สำหรับการสร้าง database ให้ใช้ script ของ 'dump_script.sql' ซึ่งสมบูรณ์แล้ว (อาจจะมีปัญหาบ้างเล็กน้อยใน table 'Appoint' เพราะตั้งค่า เป็น constraint ไว้ ซึ่งหากเจอปัญหานี้ วิธีแก้คือ altertable ลบ field constraint ออก จาก insert table Appoint แล้วค่อยมา set constraint ทีหลังด้วย alter หรือ อีกวิธีนึงคือ ไม่ต้อง insert ลง Appoint เลย แต่ให้สร้างตัว web application ก็ได้)