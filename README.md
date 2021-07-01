Установка зависимостей:
1. cd api, npm install
2. cd ../dashboard, npm install
3. cd ../file-api, npm install

Сборка и запуск контейнеров:
1. docker-compose build
2. docker-compose up

После первого запуска:
1. нужно зайти на http://localhost
2. Нажать кнопку регистрация, указать почту, пароль, имя, телефон (на почту прийдет письмо с подтверждением)
3. Чтобы изменить права у первого пользователя нужно - 
  1. Посмотреть id контейнера с бд (docker ps), он будет перед 'mysql:latest'
  2. Войти в контейнер: docker exec -it ID_MYSQL mysql -u root -p (после ввести пароль password)
  3. В терминале mysql выбрать бд: use simplecrm;
  4. Проверить, что пользователь создан: select*from User;
  5. Установить у него статус администратора, и подтвержденный: update User set isAdmin=1, isActivated=1, activationLink="" where id=1;

Приложение состоит из нескольких элементов:
1) База данных mysql (запускается в docker контейнере в network sub-etha), 
база данных сохраняется в simple_crm_volume_db, дополнительно база данных конфигурируется файлом dbconfig.cnf, а при запуске выполняется файл dbinit.sql, который создает базовую тему для панелей.
2) api (запускается в docker контейнере simple_crm_api в network sub-etha), после запуска контейнера db, имеет для разработки два volumes (node_modules, src)
3) file api (запускается в docker контейнере simple_crm_file_api в network sub-etha), после запуска приложений в контейнерах db, simple_crm_api.
4) dashboard (запускается в docker контейнере simple_crm_dashboard в network sub-etha), после запуска приложений в контейнерах db, simple_crm_api, simple_crm_file_api.
5) nginx (запускается в контейнере revproxy), после запуска всех остальных контейнеров, занимается проксированием.

1. docker volume rm $(docker volume ls -q) (удалить docker volumes)
2. docker exec -it 'id' bash (зайти в терминал контейнера)
