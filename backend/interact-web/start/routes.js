'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//POST
Route.group(() => {
  Route.post('user/login', 'UserController.logIn')
  Route.post('user/register-user', 'UserController.registerUser')
  Route.post('user/create-signature', 'DocumentController.createSignature').middleware(['auth'])
  Route.post('user/store-hash', 'DocumentController.storeBlockchainHash').middleware(['auth'])
  Route.post('user/create-document-type', 'DocumentController.createDocType').middleware(['auth'])
  Route.post('user/create-document', 'DocumentController.createDocument').middleware(['auth'])
}).prefix('api')

//GET
Route.group(() => {
Route.get('user/get-document-string', 'DocumentController.getDocumentToString').middleware(['auth'])
Route.get('user/get-certificate-credential', 'DocumentController.getCertificateByCredential').middleware(['auth'])
Route.get('user/get-all-document-type', 'DocumentController.getAllDocType').middleware(['auth'])
Route.get('user/get-document-type/:id', 'DocumentController.getDocType').middleware(['auth'])
Route.get('user/get-all-document', 'DocumentController.getAllDocument').middleware(['auth'])
}).prefix('api')