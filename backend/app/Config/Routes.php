<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->resource('user', ['controller' => 'UserController']);
$routes->match(['post', 'options'], 'api/user', 'UserController::create');
$routes->match(['put', 'options'], 'update/user/(:segment)', 'UserController::update/$1');
$routes->match(['delete', 'options'], 'delete/user/(:segment)', 'UserController::delete/$1');

$routes->match(['post', 'options'], 'api/login', 'UserController::login');

$routes->resource('materi', ['controller' => 'MateriController']);
$routes->match(['post', 'options'], 'api/materi', 'MateriController::create');
$routes->match(['put', 'options'], 'update/materi/(:segment)', 'MateriController::update/$1');
$routes->match(['delete', 'options'], 'delete/materi/(:segment)', 'MateriController::delete/$1');

$routes->resource('admin', ['controller' => 'AdminController']);
$routes->match(['post', 'options'], 'api/admin', 'AdminController::create');
$routes->match(['put', 'options'], 'update/admin/(:segment)', 'AdminController::update/$1');
$routes->match(['delete', 'options'], 'delete/admin/(:segment)', 'AdminController::delete/$1');

$routes->resource('coach', ['controller' => 'CoachController']);
$routes->match(['post', 'options'], 'api/coach', 'CoachController::create');
$routes->match(['put', 'options'], 'update/coach/(:segment)', 'CoachController::update/$1');
$routes->match(['delete', 'options'], 'delete/coach/(:segment)', 'CoachController::delete/$1');

$routes->resource('transaksi', ['controller' => 'TransaksiController']);
$routes->match(['post', 'options'], 'api/transaksi', 'TransaksiController::create');
$routes->match(['put', 'options'], 'update/transaksi/(:segment)', 'TransaksiController::update/$1');
$routes->match(['delete', 'options'], 'delete/transaksi/(:segment)', 'TransaksiController::delete/$1');