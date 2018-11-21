# BusinessCardManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

Check out the [Live Demo](https://business-card-manager-65b80.firebaseapp.com)

## Project Planning

### Structure
* **app/**
  * app module :heavy_check_mark:
  * app component :heavy_check_mark:
  * app-routing module :heavy_check_mark:
  * **auth/**
    * auth guard :heavy_check_mark:
    * auth service :heavy_check_mark:
    * admin guard :heavy_check_mark:
    * **login/**
      * login component :heavy_check_mark:
    * **register/**
      * register component :heavy_check_mark:
  * **core/**
    * core module :heavy_check_mark:
    * ~~acquire-image service~~
    * contacts service :heavy_check_mark:
    * history service :heavy_check_mark:
    * ocr service :heavy_check_mark:
  * **dashboard/**
    * dashboard module :heavy_check_mark:
    * dashboard-routing module :heavy_check_mark:
    * dashboard component :heavy_check_mark:
    * **contacts/**
      * contacts module :heavy_check_mark:
      * contacts-routing module :heavy_check_mark:
      * **add-contact/**
        * add-contact component :heavy_check_mark:
        * ~~**from-camera/**~~
          * ~~from-camera component~~
        * ~~**from-file/~~**
          * ~~from-file component~~
      * **contact-list/**
        * contact-list component :heavy_check_mark:
      * **contact-details/**
        * contact-details component :heavy_check_mark:
    * **history/**
      * history component :heavy_check_mark:
  * **shared/**
    * shared module :heavy_check_mark:
    * **models/**
      * business-card class :heavy_check_mark:
      * contact class :heavy_check_mark:
      * history-log class :heavy_check_mark:

### Other Reqirements
* Add Google Analytics. Log events with gtags. :heavy_check_mark:
* Add Timestamp for search history logs. :heavy_check_mark:
* Add tests :x:
* Add max session logout functionality :x:


### Doodle
![whiteboard doodle](./planning-doodle.jpg)
