'use strict';
/**
 * APPTO CORE Library
 * Created by auxosas/juanrmv on 6/01/15.
 * juan@auxo.co
 */


angular.module('ngAppto', ["ngResource"])
    .config([ '$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push("ngApptoHttpResponseInterceptor");
    }])
    .provider('$appto', function() {


        var _config = {
            protocol: 'https:',
            host: 'appto.co',
            appId: null,
            user_email: null,
            use_localStorage: true
        };

        var ALLOWED_FILTERSET = [
            'tipo_inmueble', 'precio_venta_min', 'precio_venta_max',
            'precio_arriendo_min', 'precio_arriendo_max', 'area_min', 'area_max',
            'estrato_min', 'estrato_max', 'habitaciones_min', 'habitaciones_max',
            'banos_min', 'banos_max', 'amoblado', 'garajes_min', 'garajes_max',
            'zona','radio','agente', 'tipo_negocio', 'ubicacion_local', 'pisos',
            'muebles', 'ubicacion_lote', 'lote_alcan', 'lote_energia', 'lote_agua',
            'urbanizacion_lote', 'estado_inmueble', 'ciudad', 'calle_final', 'carrera_final',
            'carrera_incial', 'carrera_inicial', 'zona_texto_adicional', 'garajes', 'banos', 'habitaciones',
            'calle_inicial', 'energia', 'agua', 'zonas_appto', 'esta_arriendo', 'esta_venta', 'es_exclusivo',
            'page', 'slug_link_p', 'caracteristicas','estado_fisico_inmueble','ordering'];

        var ALLOWED_ENDPOINTS = {
            'inmuebles.rest'                            : '/api/1.0/i/inmuebles/'
            , 'inmuebles_page.rest'                     : '/api/1.0/i/inmuebles_page/'
            , 'inmuebles_link_p.rest'                   : '/api/1.0/i/inmuebles_link_p/'
            , 'inmuebles_destacados.rest'               : '/api/1.0/i/inmuebles_destacados/'
            , 'inmueble_publicado.rest'                 : '/api/1.0/i/inmueble_publicado/'
            , 'inmuebles.rest.tipos-caracteristica'     : '/api/1.0/i/tipos-caracteristica'
            , 'inmuebles.rest.caracteristicas'          : '/api/1.0/i/caracteristicas/'
            , 'inmuebles.rest.tipos_inmueble'           : '/api/1.0/i/tipos-inmueble/'
            , 'inmuebles.rest.favoritos'                : '/api/1.0/i/favoritos/'
            , 'inmuebles.rest.zonas'                    : '/api/1.0/i/zonas/'
            , 'inmuebles.rest.fotos'                    : '/api/1.0/i/fotografias/'
            , 'inmuebles.rest.archivos'                 : '/api/1.0/i/archivos/'
            , 'inmuebles.rest.links_seo'                : '/api/1.0/i/links-seo/'
            , 'inmuebles.rest.links_personalizados'     : '/api/1.0/i/links-personalizados/'
            , 'procesos.rest.busqueda'                  : '/api/1.0/p/busqueda/'
            , 'procesos.rest.oferta'                    : '/api/1.0/p/oferta/'
            , 'procesos.rest.candidato-agente'          : '/api/1.0/p/candidato-agente/'
            , 'procesos.rest.solicitudes-contacto'      : '/api/1.0/p/solicitudes-contacto/'
            , 'procesos.tipos_solicitudes_list'         : '/api/1.0/p/solicitudes/tipos/list/'
            , 'procesos.solicitudes_contacto_list'      : '/api/1.0/p/solicitudes/list/'
            , 'procesos.procesos_en_curso_list'         : '/api/1.0/p/encurso/list/'
            , 'procesos.solicitud_contacto'             : '/api/1.0/p/solicitudes/add/'
            , 'procesos.ofrecer_inmueble'               : '/api/1.0/p/ofertas/add/'
            , 'procesos.ofrecer_inmueble_list'          : '/api/1.0/p/ofertas/list/'
            , 'procesos.citas_list'                     : '/api/1.0/p/citas-list/'
            , 'procesos.agregar_cita_inmueble'          : '/api/1.0/p/citas-add/'
            , 'procesos.agregar_calificacion'           : '/api/1.0/p/calificacion-add/'
            , 'procesos.busqueda_usuario'               : '/api/1.0/p/busqueda-usuario/'
            , 'procesos.rest.comentarios_oferta'        : '/api/1.0/p/comentarios-oferta/'
            , 'citas.rest'                              : '/api/1.0/p/citas-inmueble/'
            , 'procesos.get_cita'                       : '/api/1.0/p/cita-get/'
            , 'usuarios.registrar'                      : '/api/1.0/u/registrar/'
            , 'usuarios.login'                          : '/api/1.0/u/login/'
            , 'usuarios.login_fb'                       : '/api/1.0/u/login-fb/'
            , 'usuarios.dispositivo_register'           : '/api/1.0/u/dev_reg/'
            , 'usuarios.rest.usuario'                   : '/api/1.0/u/usuarios/'
            , 'usuarios.rest.user'                      : '/api/1.0/u/users/'
            , 'usuarios.rest.agente'                    : '/api/1.0/u/agentes/'
            , 'usuarios.rest.agente_as_usuario'         : '/api/1.0/u/agente-as-usuario/'
            , 'usuarios.rest.logros'                    : '/api/1.0/u/logros/'
            , 'usuarios.rest.tipo_logros'               : '/api/1.0/u/tipo-logros/'
            , 'usuarios.rest.agentes_lista'             : '/api/1.0/u/agentes-lista/'
            , 'usuarios.rest.agente_publico'            : '/api/1.0/u/agente-publico/'
            , 'usuarios.rest.calificacion'              : '/api/1.0/u/calificacion/'
            , 'usuarios.rest.tipos_negocios'            : '/api/1.0/u/tipo-negocios/'
            , 'reportes.views.reporte-inmueble'         : '/py2api/1.0/r/reporte-inmueble/'
            , 'crm.rest.interacciones'                  : '/api/1.0/crm/interacciones/'
            , 'crm.rest.following'                      : '/api/1.0/crm/following/'
            , 'crm.rest.mis-busquedas'                  : '/api/1.0/crm/mis-busquedas/'
            , 'crm.rest.busquedas'                      : '/api/1.0/crm/busquedas/'
            , 'crm.rest.mis-ofertas'                    : '/api/1.0/crm/mis-ofertas/'
            , 'crm.rest.ofertas'                        : '/api/1.0/crm/ofertas/'
            , 'crm.rest.solicitudes-contacto'           : '/api/1.0/crm/solicitudes-contacto/'
            , 'crm.rest.asignar-busqueda'               : '/api/1.0/crm/asignar-busqueda/'
            , 'crm.rest.asignar-oferta'                 : '/api/1.0/crm/asignar-oferta/'
            , 'crm.rest.ignorar-busqueda'               : '/api/1.0/crm/ignorar-busqueda/'
            , 'crm.rest.ignorar-oferta'                 : '/api/1.0/crm/ignorar-oferta/'
            , 'crm.rest.cambiar-estado-busqueda'        : '/api/1.0/crm/cambiar-estado-busqueda/'
            , 'crm.rest.cambiar-estado-oferta'          : '/api/1.0/crm/cambiar-estado-oferta/'
            , 'crm.rest.cambiar-estado-solicitud'       : '/api/1.0/crm/cambiar-estado-solicitud/'
            , 'crm.rest.archivos'                       : '/api/1.0/crm/archivos/'
            , 'crm.rest.req-ofertas'                    : '/api/1.0/crm/req-ofertas/'
            , 'crm.rest.req-busquedas'                  : '/api/1.0/crm/req-busquedas/'
            , 'crm.rest.citas'                          : '/api/1.0/crm/citas/'
            , 'crm.rest.matchBusquedas'                 : '/api/1.0/crm/matchBusquedas/'
            , 'crm.rest.matchOfertas'                   : '/api/1.0/crm/matchOfertas/'
            , 'crm.rest.busquedas-edit'                 : '/api/1.0/crm/busquedas-edit/'
            , 'crm.rest.ofertas-edit'                   : '/api/1.0/crm/ofertas-edit/'
        };


        this.setAppId = function(appId) {
            _config.appId=appId;
            return this;
        };
        this.getAppId = function() {
            return _config.appId;
        };
        this.setProtocol = function(protocol) {
            _config.protocol=protocol;
            return this;
        };
        this.getProtocol = function() {
            return _config.protocol;
        };

        this.setHost = function(host) {
            _config.host=host;
            return this;
        };
        this.getHost = function() {
            return _config.host;
        };

        this.setReportingServerProtocol = function(reportingProtocol) {
            _config.reportingProtocol=reportingProtocol;
            return this;
        };
        this.getReportingServerProtocol = function() {
            return _config.reportingProtocol;
        };

        this.setReportingServerHost = function(reportingHost) {
            _config.reportingHost=reportingHost;
            return this;
        };
        this.getReportingServerHost = function() {
            return _config.reportingHost;
        };

        this.useLocalStorage = function(useLocalStorage) {
            _config.use_localStorage=useLocalStorage;
            return this;
        };


        this.$get = ['$q', '$rootScope', '$window', '$cacheFactory', '$resource', '$http', function($q, $rootScope, $window, $cacheFactory, $resource, $http) {

            /**
             * Main variable
             * @type *
             */
            var $appto = $q.defer();


            /**
             * Main cache for appto core.
             */
            var cache = $cacheFactory('apptoCode-cache');


            /**
             * Login status variable
             * @type {boolean}
             */
            var isLoggedIn = false;

            /**
             * Variable who specifies if is a facebook login user
             * @type {boolean}
             */
            var isFacebookUser = false;

            /**
             * Variable who specifies if is a agent
             * @type {boolean}
             */
            var isAgent = false;

            /**
             * Variable who contains all the user data
             * @type {array}
             */
            var user_data = null;


            /**
             * Variable who contains all the inmuebles favoritos
             * @type {array}
             */
            var inmuebles_favoritos = null;

            var logros_agent=null;
            /**
             * Method to get a config property's value
             * @param property
             * @returns {*}
             */
            $appto.config = function (property)
            {
                return _config[property];
            }

            $appto.getStorage = function()
            {
                return $appto.config('use_localStorage')?localStorage:sessionStorage;
            }

            /**
             * Method to get the endpoint host
             * return $appto.config('protocol')+"//"+$appto.config('host');
             * return 'http://localhost:8000';
             * return 'https://staging.appto.co/';
             * @returns {*}
             */
            $appto.getHost = function ()
            {
              return $appto.config('protocol')+"//"+$appto.config('host');
            }

            /**
             * Method to get the endpoint host
             * return $appto.config('protocol')+"//"+$appto.config('host');
             * return 'http://localhost:8000';
             * return 'https://staging.appto.co/';
             * @returns {*}
             */
            $appto.getReportHost = function ()
            {
                return $appto.config('reportingProtocol')+"//"+$appto.config('reportingHost');
            }

            /**
             * Method to get the endpoint uri
             * @returns {*}
             */
            $appto.getEndpoint = function (uriId)
            {
                return ALLOWED_ENDPOINTS[uriId];
            }


            /**
             * Method to get isLoggedIn
             * @returns {*}
             */
            $appto.isLoggedIn = function ()
            {
                return isLoggedIn;
            }


            /**
             * Method to get a isAgent
             * @returns {*}
             */
            $appto.isAgent = function ()
            {
                return isAgent;
            }


            /**
             * Method to get a user_data
             * @returns {*}
             */
            $appto.getUserData = function ()
            {
                return user_data;
            }


            /**
             * Method to initialize $appto core.
             */
            $appto.init = function()
            {

                if($appto.config('appId')==null)
                    throw "$apptoProvider: `appId` is null";

                if($appto.getStorage().user_data)
                {
                    user_data = JSON.parse($appto.getStorage().user_data);
                    isLoggedIn = true;
                    isAgent = user_data.rol=="agente";
                    $http.defaults.headers.common.Authorization = 'Token ' + user_data.token;
                    $rootScope.$broadcast('ngAppto:ACTION:Login', user_data);
                }
            }


            /**
             * Method to remove all cache
             */
            $appto.removeAllCache = function()
            {
                cache.removeAll();
            }


            /**
             * Method to login
             * @param email
             * @param password
             */
            $appto.login = function (email, password) {

                var deferred = $q.defer();

                var dataSend = {
                    email: email,
                    password: password
                };

                $http.post($appto.getHost()+$appto.getEndpoint('usuarios.login'), dataSend).success(function (data) {

                    if (data.token == null) {

                        deferred.reject({msg:"E-mail y/o contraseña incorrectos.",data:data});
                    } else {
                        user_data = data;
                        isLoggedIn = true;
                        isAgent = data.rol=="agente";
                        $appto.getStorage().setItem('user_data', JSON.stringify(data));
                        $http.defaults.headers.common.Authorization = 'Token ' + user_data.token;
                        $rootScope.$broadcast('ngAppto:ACTION:Login', data);
                        deferred.resolve(data);
                    }
                }).error(function (data, status, headers, config) {
                    if(status == 401)
                    {
                        deferred.reject({msg:"E-mail y/o contraseña incorrectos",data:{data:data,status:status,headers:headers, config:config}});
                    }else{
                        deferred.reject({msg:"Error desconocido",data:{data:data,status:status,headers:headers, config:config}});
                    }

                });

                return deferred.promise;

            };


            /**
             * Method to login with facebook
             * @param client_token
             * @returns {fd.g.promise|*|promise|qFactory.Deferred.promise}
             */
            $appto.login_facebook = function (client_token) {

                var deferred = $q.defer();

                var dataSend = {
                    client_token: client_token
                };

                $http.post($appto.getHost()+$appto.getEndpoint('usuarios.login_fb'), dataSend).success(function (data) {

                    if (data.token == null) {
                        deferred.reject("Datos de conexión incorrectos");
                    } else {
                        user_data = data;
                        isLoggedIn = true;
                        isFacebookUser = true;
                        $appto.getStorage().setItem('user_data', JSON.stringify(data));
                        $http.defaults.headers.common.Authorization = 'Token ' + user_data.token;
                        $rootScope.$broadcast('ngAppto:ACTION:Login', data);
                        deferred.resolve(data);
                    }
                }).error(function (data, status, headers, config) {

                    if(status == 401)
                    {
                        deferred.reject({msg:"Debes completar el registro.",data:{data:data,status:status,headers:headers, config:config}});
                    }else{
                        deferred.reject({msg:"Debes autorizar a Appto para usar Facebook en el menú de propiedades.",data:{data:data,status:status,headers:headers, config:config}});
                    }

                });

                return deferred.promise;


            };

            /**
             * Method to logout
             * @param data
             */
            $appto.logout = function(data)
            {
                $rootScope.$broadcast('ngAppto:ACTION:Logout', data);
            };


            /**
             *
             * @param dataSend
             * @param callback
             * @param callbackError
             */
            $appto.registrarUsuario = function (nombre, apellido, email, telefono_contacto) {


                var deferred = $q.defer();

                var dataSend = {
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    telefono_contacto: telefono_contacto
                };

                $http.post($appto.getHost()+ $appto.getEndpoint('usuarios.registrar'), dataSend).success(function (data) {
                    user_data = data;
                    isLoggedIn = true;
                    $appto.getStorage().setItem('user_data', JSON.stringify(data));
                    $http.defaults.headers.common.Authorization = 'Token ' + user_data.token;
                    $rootScope.$broadcast('ngAppto:ACTION:Register', data);
                    $rootScope.$broadcast('ngAppto:ACTION:Login', data);
                    deferred.resolve(data);

                }).error(function (data, status, headers, config) {
                    if(status == 409)
                    {
                        deferred.reject({msg:"Ya existe un usuario con este correo. Recobra tu clave.",data:{data:data,status:status,headers:headers, config:config}});
                    }else{
                        deferred.reject({msg:"Error desconocido",data:{data:data,status:status,headers:headers, config:config}});
                    }
                });

                return deferred.promise;


            };

            $appto.registrarUsuarioDesdeAgente = function (nombre, apellido, email, telefono_contacto) {

                var deferred = $q.defer();

                var dataSend = {
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    telefono_contacto: telefono_contacto
                };

                $http.post($appto.getHost()+ $appto.getEndpoint('usuarios.registrar'), dataSend).success(function (data) {
                    deferred.resolve(data);

                }).error(function (data, status, headers, config) {
                    if(status == 409)
                    {
                        deferred.reject({msg:"Ya existe un usuario con este correo. Recobra tu clave.",data:{data:data,status:status,headers:headers, config:config}});
                    }else{
                        deferred.reject({msg:"Error desconocido",data:{data:data,status:status,headers:headers, config:config}});
                    }
                });
                return deferred.promise;
            };



            /*
             $appto.$resources.model.inmueble = $resource(
             api['inmuebles.rest'],
             {
             someParam: '@someProp'
             },
             {   'get'       :{method:'GET'},
             'save'      :{method:'POST'},
             'query'     :{method:'GET', isArray:true},
             'remove'    :{method:'DELETE'},
             'delete'    :{method:'DELETE'},
             'action1'   :{method:?, params:?, url:?, isArray:?, headers:?, ...},
             });

             */




            //Resources


            $appto.$resources = $q.defer();

          $appto.$resources.interacciones = $resource(
                  $appto.getHost()+$appto.getEndpoint('crm.rest.interacciones')+":id",
              {
                  id: '@id'
              },
              {

                  'get'       :{method:'GET'},
                  'save'      :{method:'POST'},
                  'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.interacciones'), isArray:true},
                  'patch'     :{method: 'PATCH'},
                  'update'    :{method: 'PUT'},
                  'remove'    :{method:'DELETE'},
                  'delete'    :{method:'DELETE'}

              });

          $appto.$resources.following = $resource(
                  $appto.getHost()+$appto.getEndpoint('crm.rest.following')+":id",
              {
                  id: '@id'
              },
              {

                  'get'       :{method:'GET'},
                  'save'      :{method:'POST'},
                  'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.following'), isArray:true},
                  'patch'     :{method: 'PATCH'},
                  'update'    :{method: 'PUT'},
                  'remove'    :{method:'DELETE'},
                  'delete'    :{method:'DELETE'}

              });

              $appto.$resources.misBusquedas = $resource(
                      $appto.getHost()+$appto.getEndpoint('crm.rest.mis-busquedas')+":id",
                  {
                      id: '@id'
                  },
                  {

                      'get'       :{method:'GET'},
                      'save'      :{method:'POST'},
                      'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.mis-busquedas'), isArray:true},
                      'patch'     :{method: 'PATCH'},
                      'update'    :{method: 'PUT'},
                      'remove'    :{method:'DELETE'},
                      'delete'    :{method:'DELETE'}

                  });

              $appto.$resources.busquedas = $resource(
                      $appto.getHost()+$appto.getEndpoint('crm.rest.busquedas')+":id",
                  {
                      id: '@id'
                  },
                  {

                      'get'       :{method:'GET'},
                      'save'      :{method:'POST'},
                      'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.busquedas'), isArray:true, ignoreLoadingBar: true},
                      'patch'     :{method: 'PATCH'},
                      'update'    :{method: 'PUT'},
                      'remove'    :{method:'DELETE'},
                      'delete'    :{method:'DELETE'}

                  });


            $appto.$resources.misOfertas = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.mis-ofertas')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.mis-ofertas'), isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.ofertas = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.ofertas')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.ofertas'), isArray:true, ignoreLoadingBar: true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.solicitudesContacto = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.solicitudes-contacto')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.solicitudes-contacto'), isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.asignarBusqueda = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.asignar-busqueda')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.asignar-busqueda'), isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.asignarOferta = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.asignar-oferta')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.asignar-oferta'), isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.ignorarBusqueda = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.ignorar-busqueda')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.ignorar-busqueda'), isArray:false},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.ignorarOferta = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.ignorar-oferta')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.ignorar-oferta'), isArray:false},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.matchBusqueda = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.matchBusquedas')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET', isArray:true},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.matchBusquedas'), isArray:false},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.matchOferta = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.matchOfertas')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET', isArray:true},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.matchOfertas'), isArray:false},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.reqOfertas = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.req-ofertas')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.req-ofertas'), isArray:false},

                });

            $appto.$resources.reqBusquedas = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.req-busquedas')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.req-busquedas'), isArray:false},

                });

            $appto.$resources.citas = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.citas')+":id",
                {
                    id: '@id'
                },
                {
                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.citas'), isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.cambiarEstadoBusqueda = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.cambiar-estado-busqueda' )+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.cambiar-estado-busqueda' ), isArray:false},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.cambiarEstadoOferta = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.cambiar-estado-oferta' )+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.cambiar-estado-oferta' ), isArray:false},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.cambiarEstadoSolicitud = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.cambiar-estado-solicitud' )+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.cambiar-estado-solicitud' ), isArray:false},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

            $appto.$resources.logrosResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('usuarios.rest.logros')+":id",
                {
                    id: '@id'
                },
                {
                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('usuarios.rest.logros'), isArray:true}

                });

            $appto.$resources.tipoLogrosResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('usuarios.rest.tipo_logros')+":id",
                {
                    id: '@id'
                },
                {
                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('usuarios.rest.tipo_logros'), isArray:true}

                });

                $appto.$resources.busquedasEdit = $resource(
          $appto.getHost()+$appto.getEndpoint('crm.rest.busquedas-edit')+":id",
                {
                    id: '@id'
                },
                {

                    'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.busquedas-edit'), isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}

                });

          $appto.$resources.ofertasEdit = $resource(
                  $appto.getHost()+$appto.getEndpoint('crm.rest.ofertas-edit')+":id",
              {
                  id: '@id'
              },
              {

                  'get'       :{method:'GET'},
                  'save'      :{method:'POST'},
                  'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.ofertas-edit'), isArray:true},
                  'patch'     :{method: 'PATCH'},
                  'update'    :{method: 'PUT'},
                  'remove'    :{method:'DELETE'},
                  'delete'    :{method:'DELETE'}

              });

            $appto.$resources.comentariosOfertaResource = $resource(
                        $appto.getHost()+$appto.getEndpoint('procesos.rest.comentarios_oferta')+":id",
                    {
                        id: '@id'
                    },
                    {

                        'get'       :{method:'GET'},
                        'save'      :{method:'POST'},
                        'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('procesos.rest.comentarios_oferta'), isArray:true},
                        'patch'     :{method: 'PATCH'},
                        'update'    :{method: 'PUT'},
                        'remove'    :{method:'DELETE'},
                        'delete'    :{method:'DELETE'}

                    });

              $appto.$resources.reporteInmuebleResource = $resource(
                          $appto.getReportHost()+$appto.getEndpoint('reportes.views.reporte-inmueble')+":id",
                      {
                          id: '@id'
                      },
                      {

                          'get'       :{method:'GET'},
                          'save'      :{method:'POST'},
                          'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('reportes.views.reporte-inmueble'), isArray:false},
                          'patch'     :{method: 'PATCH'},
                          'update'    :{method: 'PUT'},
                          'remove'    :{method:'DELETE'},
                          'delete'    :{method:'DELETE'}

                      });

            $appto.$resources.listaAgentesResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('usuarios.rest.agentes_lista')+":id",
                {
                    id: '@id'
                },
                {
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('usuarios.rest.agentes_lista'), isArray:true}

                });

            $appto.$resources.agentePublicoResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('usuarios.rest.agente_publico')+":id",
                {
                    id: '@id'
                },
                {
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('usuarios.rest.agente_publico'), isArray:true}

                });

            $appto.$resources.linksSEO = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest.links_seo')+":id",
                {
                    id: '@id'
                },
                {
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.links_seo'), isArray:true}

                });

            $appto.$resources.linksPersonalizados = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest.links_personalizados')+":id",
                {
                    id: '@id'
                },
                {
                  'get'       :{method:'GET', cache:false},
                  'save'      :{method:'POST'},
                  'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.links_personalizados'), isArray:true,cache:true},
                  'patch'     :{method: 'PATCH'},
                  'update'    :{method: 'PUT'},
                  'remove'    :{method:'DELETE'},
                  'delete'    :{method:'DELETE'}

                });

            $appto.$resources.calificacion = $resource(
                    $appto.getHost()+$appto.getEndpoint('usuarios.rest.calificacion')+":id",
                {
                    id: '@id'
                },
                {
                      'get'       :{method:'GET', cache:false},
                      'save'      :{method:'POST'},
                      'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('usuarios.rest.calificacion'), isArray:true,cache:false},
                      'patch'     :{method: 'PATCH'},
                      'update'    :{method: 'PUT'},
                      'remove'    :{method:'DELETE'},
                      'delete'    :{method:'DELETE'}

                });

            $appto.$resources.inmuebleResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:false},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest'), isArray:true, cache:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.inmuebleResourceNoCache = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest'), isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });

            $appto.$resources.inmueblePageResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles_page.rest')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:false},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles_page.rest'), isArray:false, cache:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });

            $appto.$resources.inmuebleLinkPResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles_link_p.rest')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:false},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles_link_p.rest'), isArray:true, cache:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });

            $appto.$resources.inmueblesDestacadosResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles_destacados.rest')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:false},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles_destacados.rest'), isArray:true, cache:false},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });

            $appto.$resources.inmueblePublicadoResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmueble_publicado.rest')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:false},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmueble_publicado.rest'), isArray:true, cache:false},
                });

            $appto.$resources.tiposInmuebleResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest.tipos_inmueble')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:true},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.tipos_inmueble'), isArray:true, cache:true}
                });


            $appto.$resources.tiposNegocioResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('usuarios.rest.tipos_negocios')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:true},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('usuarios.rest.tipos_negocios'), isArray:true, cache:true}
                });


            $appto.$resources.caracteristicasResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest.caracteristicas')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:true},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', isArray:true, cache:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'createAll' :{method: 'POST', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.caracteristicas'), isArray:true},
                    'updateAll' :{method: 'PUT', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.caracteristicas'), isArray:true},
                    'patchAll'  :{method: 'PATCH', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.caracteristicas'), isArray:true},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.citasResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('citas.rest')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'updateAll' :{method: 'PUT', url: $appto.getHost()+$appto.getEndpoint('citas.rest'), isArray:true},
                    'patchAll'  :{method: 'PATCH', url: $appto.getHost()+$appto.getEndpoint('citas.rest'), isArray:true},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.zonasResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest.zonas')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:true},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.zonas'), isArray:true, cache:true}
                });

            $appto.$resources.tiposCaracteristicaResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest.tipos-caracteristica')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET', cache:true},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.tipos-caracteristica'), isArray:true, cache:true}
                });


            $appto.$resources.inmueblesFavoritosResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest.favoritos')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.favoritos'), isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.busquedaResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('procesos.rest.busqueda')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('procesos.rest.busqueda'), cache:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.ofertaResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('procesos.rest.oferta')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('procesos.rest.oferta'), cache:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.candidatoAgenteResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('procesos.rest.candidato-agente')+":id",
                {
                    id: '@id'
                },
                {
                    'save'      :{method:'POST'}
                });

            $appto.$resources.fotosResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest.fotos')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.fotos'), isArray:true},
                    'patch'     :{method:'PATCH'},
                    'update'    :{method:'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.archivosResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('inmuebles.rest.archivos')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('inmuebles.rest.archivos'), isArray:true},
                    'patch'     :{method:'PATCH'},
                    'update'    :{method:'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.archivosBusquedaResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('crm.rest.archivos')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('crm.rest.archivos'), isArray:true},
                    'patch'     :{method:'PATCH'},
                    'update'    :{method:'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });

            $appto.$resources.solicitudContactoResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('procesos.rest.solicitudes-contacto')+":id",
                {
                    id: '@id'
                },
                {   'get'       :{method:'GET'},
                    'save'      :{method:'POST'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('procesos.rest.solicitudes-contacto'), isArray:true},
                    'patch'     :{method: 'PATCH'},
                    'update'    :{method: 'PUT'},
                    'remove'    :{method:'DELETE'},
                    'delete'    :{method:'DELETE'}
                });


            $appto.$resources.usuarioResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('usuarios.rest.usuario')+":id",
                {
                    id: '@id'
                },
                {
                    'get'       :{method:'GET'},
                    'patch'     :{method: 'PATCH'},
                    'query'     :{method:'GET', url: $appto.getHost()+$appto.getEndpoint('usuarios.rest.usuario'), isArray:false},
                });

            $appto.$resources.agenteAsUsuarioResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('usuarios.rest.agente_as_usuario')+":id",
                {
                    id: '@id'
                },
                {
                    'get'       :{method:'GET'},
                    'patch'     :{method: 'PATCH'}
                });

            $appto.$resources.agenteResource = $resource(
                        $appto.getHost()+$appto.getEndpoint('usuarios.rest.agente')+":id",
                    {
                        id: '@id'
                    },
                    {
                        'patch'     :{method: 'PATCH'}
                    });


            $appto.$resources.userResource = $resource(
                    $appto.getHost()+$appto.getEndpoint('usuarios.rest.user')+":id",
                {
                    id: '@id'
                },
                {
                    'get'     :{method: 'GET'},
                    'patch'     :{method: 'PATCH'}
                });


            //Methods
            $appto.inmuebles = $q.defer();

            $appto.inmuebles.createInteraccion = function(interaccion)
            {
                return $appto.$resources.interacciones.save({},interaccion).$promise;

            };

            $appto.inmuebles.createFollowing = function(following)
            {
                return $appto.$resources.following.save({},following).$promise;

            };

            $appto.inmuebles.createBusqueda = function(busqueda)
            {
                return $appto.$resources.busquedas.save({},busqueda).$promise;

            };

            $appto.inmuebles.createOferta = function(oferta)
            {
                return $appto.$resources.ofertas.save({},oferta).$promise;

            };

            $appto.inmuebles.updateBusquedaCRM = function(busqueda)
            {
                return $appto.$resources.busquedasEdit.patch({id:busqueda.id}, busqueda).$promise;

            };

            $appto.inmuebles.updateOfertaCRM = function(oferta)
            {
                return $appto.$resources.ofertasEdit.patch({id:oferta.id}, oferta).$promise;

            };

            $appto.inmuebles.getInteracciones = function()
            {
                return $appto.$resources.interacciones.query().$promise;
            };

            $appto.inmuebles.getMisBusquedas = function(page)
            {
                return $appto.$resources.misBusquedas.query({page: page}).$promise;
            };

            $appto.inmuebles.getBusquedasNoAsignadas = function()
            {
                return $appto.$resources.busquedas.query().$promise;
            };

            $appto.inmuebles.getMisOfertas = function(page)
            {
                return $appto.$resources.misOfertas.query({page: page}).$promise;
            };

            $appto.inmuebles.getOfertasNoAsignadas = function()
            {
                return $appto.$resources.ofertas.query().$promise;
            };

            $appto.inmuebles.getMatchOferta = function(busqueda_id, page)
            {
                return $appto.$resources.matchOferta.query({search:busqueda_id, page: page}).$promise;
            };

            $appto.inmuebles.getMatchBusqueda = function(oferta_id, page)
            {
                return $appto.$resources.matchBusqueda.query({search:oferta_id, page: page}).$promise;
            };

            $appto.inmuebles.asignarBusqueda = function(busqueda_id, agente_id)
            {
                return $appto.$resources.asignarBusqueda.get({busqueda_id: busqueda_id, agente_id: agente_id}).$promise;
            };

            $appto.inmuebles.asignarOferta = function(oferta_id, agente_id)
            {
                return $appto.$resources.asignarOferta.get({oferta_id: oferta_id, agente_id: agente_id}).$promise;
            };

            $appto.inmuebles.ignorarBusqueda = function(busqueda_id)
            {
                return $appto.$resources.ignorarBusqueda.get({busqueda_id: busqueda_id}).$promise;
            };

            $appto.inmuebles.ignorarOferta = function(oferta_id)
            {
                return $appto.$resources.ignorarOferta.get({oferta_id: oferta_id}).$promise;
            };

            $appto.inmuebles.cambiarEstadoBusqueda = function(params)
            {
                return $appto.$resources.cambiarEstadoBusqueda.get(params).$promise;
            };

            $appto.inmuebles.cambiarEstadoOferta = function(params)
            {
                return $appto.$resources.cambiarEstadoOferta.get(params).$promise;
            };

            $appto.inmuebles.cambiarEstadoSolicitud = function(params)
            {
                return $appto.$resources.cambiarEstadoSolicitud.get(params).$promise;
            };

            $appto.inmuebles.getInmueble = function(id)
            {
                if(isAgent)
                {
                    return $appto.$resources.inmuebleResourceNoCache.get({id:id}).$promise;
                }else{
                    return $appto.$resources.inmuebleResource.get({id:id}).$promise;
                }

            };

            $appto.inmuebles.getEstado = function(estado)
            {
                if(estado==1)
                {
                    return 'Creado/Sin publicar';
                }
                else if(estado==2)
                {
                    return 'Firmado/Sin publicar';
                }
                else if(estado==3)
                {
                    return 'Publicado';
                }
                else if(estado==4)
                {
                    return 'Reservado';
                }
                else if(estado==5)
                {
                    return 'Cerrado con Appto';
                }
                else{
                    return 'Terminado';
                }

            };

            $appto.inmuebles.getAllInmuebles = function()
            {
                return $appto.$resources.inmuebleResource.query().$promise;

            };

            $appto.inmuebles.getReporteInmueble = function(id_inmueble, id_agente)
            {
                return $appto.$resources.reporteInmuebleResource.save({inmueble:id_inmueble, agente:id_agente}).$promise;

            };

            $appto.inmuebles.getAllInmueblesOrder = function()
            {
                return $appto.$resources.inmuebleResource.query({ordering:'-es_exclusivo, -fecha_creacion', destacado:'True'}).$promise;

            };
            $appto.inmuebles.getAllInmueblesOrderExclusivos = function()
            {
                return $appto.$resources.inmuebleResource.query({ordering:'-es_exclusivo, -fecha_creacion', es_exclusivo:'True'}).$promise;

            };

            $appto.inmuebles.getAllInmueblesPublicados = function()
            {
                return $appto.$resources.inmuebleResource.query({estado:3}).$promise;

            };

            $appto.inmuebles.getAllLinksSEO = function()
            {
                return $appto.$resources.linksSEO.query().$promise;

            };

            $appto.inmuebles.getAllLinksPersonalizados = function()
            {
                return $appto.$resources.linksPersonalizados.query({lite:'yes'}).$promise;

            };

            $appto.inmuebles.getAllInmueblesByLinkPersonalizado = function(slug_link)
            {
                return $appto.$resources.linksPersonalizados.query({slug:slug_link}).$promise;

            };

            $appto.inmuebles.updateLinkPersonalizado = function(link_personalizado)
            {
                console.log(link_personalizado.inmuebles);
                return $appto.$resources.linksPersonalizados.patch({id:link_personalizado.id}, {inmuebles: link_personalizado.inmuebles}).$promise;
            };

            $appto.inmuebles.getAllInmueblesByEmailUsuario = function(email_usuario)
            {
                return $appto.$resources.inmuebleResource.query({correo_propietario:email_usuario}).$promise;

            };

            $appto.inmuebles.createInmueble = function(inmueble)
            {
                return $appto.$resources.inmuebleResource.save({},inmueble).$promise;

            };

            $appto.inmuebles.updateInmueble = function(inmueble)
            {
                return $appto.$resources.inmuebleResource.patch({id:inmueble.id}, inmueble).$promise;
            };

            $appto.inmuebles.filterInmuebles = function(filters)
            {
                return $appto.$resources.inmuebleResource.query(filters).$promise;
            };

            $appto.inmuebles.filterInmueblesPages = function(filters)
            {
                var deferred = $q.defer();

                var invalidFilters = _.difference(_.keys(filters), ALLOWED_FILTERSET);
                if(invalidFilters.length==0)
                    return $appto.$resources.inmueblePageResource.query(filters).$promise;
                else
                {


                    setTimeout(function(){
                        deferred.reject({msg: "There is invalid filters set",invalidFilters: invalidFilters});
                    }, 500);


                    return deferred.promise;
                }
            };

            $appto.inmuebles.filterInmueblesLinkP = function(filters)
            {
                var deferred = $q.defer();

                var invalidFilters = _.difference(_.keys(filters), ALLOWED_FILTERSET);
                if(invalidFilters.length==0)
                    return $appto.$resources.inmuebleLinkPResource.query(filters).$promise;
                else
                {


                    setTimeout(function(){
                        deferred.reject({msg: "There is invalid filters set",invalidFilters: invalidFilters});
                    }, 500);


                    return deferred.promise;
                }
            };

            $appto.inmuebles.getAllInmueblesDestacados = function()
            {
              return $appto.$resources.inmueblesDestacadosResource.query().$promise;
            };

            $appto.inmuebles.inmuebleEsPublicado = function(id_inm)
            {
              return $appto.$resources.inmueblePublicadoResource.get({id:id_inm}).$promise;
            };

            $appto.inmuebles.getAllLogrosByAgente = function(id_agente)
            {

                    return $appto.$resources.logrosResource.query({agente:id_agente}).$promise;

            };

            $appto.inmuebles.saveLogroByAgente = function(id_agente,texto_logro,id_tipo_logro)
            {

                    return $appto.$resources.logrosResource.save({
                      logro:texto_logro,
                      agente:id_agente,
                      tipo_logro:id_tipo_logro
                      }).$promise;

            };

            $appto.inmuebles.saveCalificacionOferta = function(id_agente,id_oferta,calificacion_int,calificacion_txt, id_usuario)
            {

                    return $appto.$resources.calificacion.save({
                      agente:id_agente,
                      oferta_inmueble:id_oferta,
                      calificacion:calificacion_int,
                      calificacion_texto:calificacion_txt,
                      autor:id_usuario
                      }).$promise;

            };

            $appto.inmuebles.saveCalificacionBusqueda = function(id_agente,id_busqueda,calificacion_int,calificacion_txt, id_usuario)
            {

                    return $appto.$resources.calificacion.save({
                      agente:id_agente,
                      busqueda_inmueble:id_busqueda,
                      calificacion:calificacion_int,
                      calificacion_texto:calificacion_txt,
                      autor:id_usuario
                      }).$promise;

            };

            $appto.inmuebles.saveCalificacionToken = function(id_c,calificacion_int,calificacion_txt)
            {

                    return $appto.$resources.calificacion.patch({id:id_c},{
                      calificacion:calificacion_int,
                      calificacion_texto:calificacion_txt,
                      calificada: 'True'
                      }).$promise;

            };

            $appto.inmuebles.getCalificacionByAgente = function(id_agente)
            {

                    return $appto.$resources.calificacion.query({agente:id_agente, calificada:'True'}).$promise;

            };

            $appto.inmuebles.getCalificacionByToken = function(token_c)
            {

                    return $appto.$resources.calificacion.query({token:token_c}).$promise;

            };

            $appto.inmuebles.getAllTipoLogros = function()
            {

                    return $appto.$resources.tipoLogrosResource.query().$promise;

            };

            $appto.inmuebles.getAllComentariosByOferta = function(id_oferta)
            {

                    return $appto.$resources.comentariosOfertaResource.query({oferta_inmueble:id_oferta}).$promise;

            };

            $appto.inmuebles.getAllComentariosByBusqueda = function(id_busqueda)
            {

                    return $appto.$resources.comentariosOfertaResource.query({busqueda_inmueble:id_busqueda}).$promise;

            };

            $appto.inmuebles.getAllComentariosByInmueble = function(id_inmueble)
            {

                    return $appto.$resources.comentariosOfertaResource.query({inmueble:id_inmueble}).$promise;

            };

            $appto.inmuebles.getAgentePublico = function(id_agente)
            {
                    return $appto.$resources.agentePublicoResource.query({id:id_agente}).$promise;

            };

            $appto.inmuebles.getAgentePublicoSlug = function(slug_agente)
            {
                    return $appto.$resources.agentePublicoResource.query({slug:slug_agente}).$promise;

            };

            $appto.inmuebles.getAllAgentes = function()
            {

                    return $appto.$resources.listaAgentesResource.query({publicado:'True'}).$promise;

            };

            $appto.inmuebles.getAllInmueblesByAgente = function(id_agente)
            {
                return $appto.$resources.inmuebleResource.query({agente:id_agente}).$promise;

            };

            $appto.inmuebles.getAllZonas = function()
            {
                return $appto.$resources.zonasResource.query().$promise;
            };

            $appto.inmuebles.getAllCiudades = function()
            {
                return $appto.$resources.zonasResource.query({tipo_zona:2}).$promise;
            };

            $appto.inmuebles.createCaracteristicas = function(caracteristicas)
            {
                return $appto.$resources.caracteristicasResource.createAll({}, caracteristicas).$promise;
            };

            $appto.inmuebles.updateAllCaracteristicas = function(caracteristicas)
            {
                return $appto.$resources.caracteristicasResource.patchAll({}, caracteristicas).$promise;
            };

            $appto.inmuebles.deleteAllCaracteristicas = function(id_inmueble)
            {
                var deferred = $q.defer();

                $appto.inmuebles.getInmueble(id_inmueble).then(function(data){
                    if(angular.isArray(data.caracteristicas))
                    {
                        if(data.caracteristicas.length>0)
                        {
                            var i= 0;
                            _.each(data.caracteristicas, function(caracteristica){
                                i++;
                                $appto.$resources.caracteristicasResource.delete({id: caracteristica.id}).$promise.then(function(ok){
                                    if(data.caracteristicas.length<i)
                                    {
                                        deferred.notify(ok);
                                    }else{

                                        deferred.resolve(ok);
                                    }

                                },function(error){
                                    deferred.reject(error);
                                });
                            });
                        }else{
                            deferred.resolve('');
                        }

                    }else{
                        deferred.resolve('');
                    }

                });

                return deferred.promise;
            };

            $appto.inmuebles.getAllTiposInmueble = function()
            {
                return $appto.$resources.tiposInmuebleResource.query().$promise;

            };

            $appto.inmuebles.getAllTiposNegocio = function()
            {
                return $appto.$resources.tiposNegocioResource.query().$promise;

            };

            $appto.inmuebles.getAllTiposCaracteristicas = function()
            {
                return $appto.$resources.tiposCaracteristicaResource.query().$promise;

            };

            $appto.inmuebles.getAllTiposCaracteristicasExpAppto = function()
            {
                return $appto.$resources.tiposCaracteristicaResource.query({experiencia_appto:'True'}).$promise;

            };


            $appto.inmuebles.deleteInmuebleFavorito = function(id)
            {
                return $appto.$resources.inmueblesFavoritosResource.delete({id:id}).$promise;
            };

            $appto.inmuebles.addInmuebleFavorito = function(id_inmueble)
            {
                return $appto.$resources.inmueblesFavoritosResource.save({inmueble:id_inmueble, usuario:$appto.getUserData().usuario.id}).$promise;
            };

            $appto.inmuebles.addComentarioOfertaInmueble = function(comentario, id_oferta, id_agente, nombre_c, apellido_c, telefono_c, email_c)
            {
                return $appto.$resources.comentariosOfertaResource.save({
                  comentario:comentario,
                  oferta_inmueble:id_oferta,
                  autor:id_agente,
                  nombre:nombre_c,
                  apellido:apellido_c,
                  telefono:telefono_c,
                  correo:email_c
                  }).$promise;
            };

            $appto.inmuebles.addComentarioBusquedaInmueble = function(comentario, id_busqueda, id_agente, nombre_c, apellido_c, telefono_c, email_c)
            {
                return $appto.$resources.comentariosOfertaResource.save({
                  comentario:comentario,
                  busqueda_inmueble:id_busqueda,
                  autor:id_agente,
                  nombre:nombre_c,
                  apellido:apellido_c,
                  telefono:telefono_c,
                  correo:email_c
                  }).$promise;
            };

            $appto.inmuebles.addComentarioInmueble = function(comentario, id_inmueble, id_agente, nombre_c, apellido_c, telefono_c, email_c)
            {
                return $appto.$resources.comentariosOfertaResource.save({
                  comentario:comentario,
                  inmueble:id_inmueble,
                  autor:id_agente,
                  nombre:nombre_c,
                  apellido:apellido_c,
                  telefono:telefono_c,
                  correo:email_c
                  }).$promise;
            };

            $appto.inmuebles.getAllInmueblesFavoritos = function()
            {
                return $appto.$resources.inmueblesFavoritosResource.query({}).$promise;
            };


            $appto.inmuebles.getExperienciaApptoById = function(id)
            {
                return $appto.$resources.busquedaResource.get({id:id}).$promise;
            };

            $appto.inmuebles.getRequerimientoBusquedaApptoByIdCRM = function(id)
            {
                return $appto.$resources.busquedas.get({id:id}).$promise;
            };


            $appto.inmuebles.updateExperiencia = function(experiencia)
            {
                return $appto.$resources.busquedaResource.patch({id:experiencia.id}, {estado:experiencia.estado,
                  buscando_inmueble_texto:experiencia.buscando_inmueble_texto,
                  presentando_inmueble_texto:experiencia.presentando_inmueble_texto,
                  solicitud_finalizada_texto:experiencia.solicitud_finalizada_texto,
                  valor_cerrado:experiencia.valor_cerrado}).$promise;
            };

            $appto.inmuebles.updateExperienciaById = function(experiencia_id,filtros, zona_direccion, ciudad, caracteristicas, caracteristicasDeseables)
            {
                return $appto.$resources.busquedaResource.patch({id:experiencia_id},
                    {
                        filtros:filtros,
                        zonas_texto:zona_direccion,
                        ciudad_texto:ciudad,
                        caracteristicas: _.pluck(caracteristicas,'id'),
                        caracteristicas_deseables: _.pluck(caracteristicasDeseables,'id')
                    }).$promise;
            };

            $appto.inmuebles.updateExperienciaBusquedaById = function(experiencia_id,experiencia)
            {
                return $appto.$resources.busquedaResource.update(experiencia).$promise;
            };

            $appto.inmuebles.getLastExperienciaAppto = function()
            {
                return $appto.$resources.busquedaResource.query({ultima:'True'}).$promise;
            };

            $appto.inmuebles.getAllExperienciasApptos = function(num_pagina)
            {
              if(num_pagina!='null' || num_pagina !='')
              {
                return $appto.$resources.busquedaResource.query({page:num_pagina, ordering:'-id'}).$promise;
              }
              else
              {
                return $appto.$resources.busquedaResource.query().$promise;
              }
            };

            $appto.inmuebles.getAllExperienciasApptosFilters = function(filtros)
            {
                return $appto.$resources.busquedaResource.query(filtros).$promise;
            };

            $appto.inmuebles.getAllExperienciasApptosByAgente = function(experiencia)
            {

                return $appto.$resources.busquedaResource.query(experiencia).$promise;


            };

            $appto.inmuebles.getAllExperienciasApptosByUsuario = function(experiencia)
            {

                return $appto.$resources.busquedaResource.query(experiencia).$promise;


            };


            $appto.inmuebles.addExperienciaAppto = function(filtros, caracteristicas, caracteristicasDeseables, zonas, agente,zona_direccion, ciudad)
            {
                return $appto.$resources.busquedaResource.save(
                    {
                        filtros:filtros,
                        caracteristicas: _.pluck(caracteristicas,'id'),
                        caracteristicas_deseables: _.pluck(caracteristicasDeseables,'id'),
                        zonas: zonas,
                        agente:agente,
                        usuario:$appto.getUserData().usuario.id,
                        zonas_texto:zona_direccion,
                        ciudad_texto:ciudad
                    }).$promise;
            };

            $appto.inmuebles.addExperienciaBusqueda = function(busqueda)
            {
                return $appto.$resources.busquedaResource.save({}, busqueda).$promise;
            };

            $appto.inmuebles.deleteExperienciaAppto = function(experiencia)
            {
                return $appto.$resources.busquedaResource.patch({id:experiencia.id}, {id:experiencia.id, estado:5}).$promise;
            };

            $appto.inmuebles.cambiar_estado_exp_propietario = function(exp_propietario)
            {
                return $appto.$resources.ofertaResource.patch({id:exp_propietario.id}, { estado:exp_propietario.estado}).$promise;
            };

            $appto.inmuebles.getOfertaById = function(id)
            {
                return $appto.$resources.ofertaResource.get({id:id}).$promise;
            };

            $appto.inmuebles.getRequerimientoOfertaByIdCRM = function(id)
            {
                return $appto.$resources.ofertas.get({id:id}).$promise;
            };

            $appto.inmuebles.getAllOfertas = function(num_pagina)
            {
              if(num_pagina!='null' || num_pagina !='')
              {
                return $appto.$resources.ofertaResource.query({page:num_pagina, ordering:'-id'}).$promise;
              }
              else
              {
                return $appto.$resources.ofertaResource.query().$promise;
              }

            };

            $appto.inmuebles.getAllOfertasFilters = function(experiencia)
            {
                return $appto.$resources.ofertaResource.query(experiencia).$promise;
            };

            $appto.inmuebles.getAllOfertasCrmFilters = function(experiencia)
            {
                return $appto.$resources.reqOfertas.query(experiencia).$promise;
            };

            $appto.inmuebles.getAllBusquedasCrmFilters = function(experiencia)
            {
                return $appto.$resources.reqBusquedas.query(experiencia).$promise;
            };

            $appto.inmuebles.getAllOfertasByAgente = function(experiencia_filters)
            {
                return $appto.$resources.ofertaResource.query(experiencia_filters).$promise;
            };

            $appto.inmuebles.getAllSolicitudesByAgente = function(solicitud)
            {
                return $appto.$resources.solicitudContactoResource.query(solicitud).$promise;
            };

            $appto.inmuebles.createSolicitud = function(solicitud)
            {
                return $appto.$resources.solicitudesContacto.save({}, solicitud).$promise;
            };

            $appto.inmuebles.getAllSolicitudesByAgenteCrm = function(page)
            {
                return $appto.$resources.solicitudesContacto.query({page:page}).$promise;
            };

            $appto.inmuebles.getSolicitudContactoById = function(id)
            {
                return $appto.$resources.solicitudContactoResource.get({id:id}).$promise;
            };

            $appto.inmuebles.getRequerimientoSolicitudByIdCRM = function(id)
            {
                return $appto.$resources.solicitudesContacto.get({id:id}).$promise;
            };

            $appto.inmuebles.addOferta = function(direccion,agente,area,anio_construccion,valor_administracion,valor,caracteristicas,tipo_negocio,tipo_inmueble,garajes,banos,habitaciones,estado_inmueble, filtros)
             {
                 return $appto.$resources.ofertaResource.save(
                     {
                         direccion:direccion,
                         usuario:$appto.getUserData().usuario.id,
                         agente_asignado:agente,
                         area:area,
                         anio_construccion:anio_construccion,
                         valor_administracion:valor_administracion,
                         valor:valor,
                         habitaciones:habitaciones,
                         banos:banos,
                         garajes:garajes,
                         tipo_inmueble:tipo_inmueble,
                         caracteristicas: _.pluck(caracteristicas,'id'),
                         tipo_negocio:tipo_negocio,
                         estado_inmueble:estado_inmueble,
                         filtros:filtros

                     }).$promise;
             };

             $appto.inmuebles.addOfertaObject = function(oferta)
             {
                 return $appto.$resources.ofertaResource.save({},oferta).$promise;
             };


             $appto.inmuebles.deleteOferta = function(experiencia)
             {
                 return $appto.$resources.ofertaResource.patch({id:experiencia.id}, {id:experiencia.id, estado:2}).$promise;
             };

             $appto.inmuebles.addCandidatoAgente = function(candidato)
             {
                 return $appto.$resources.candidatoAgenteResource.save(candidato).$promise;
             };

             $appto.inmuebles.addCita = function(cita)
             {
                 return $appto.$resources.citas.save(cita).$promise;
             };

             $appto.inmuebles.getCitasCrmByAgente = function()
             {
                 return $appto.$resources.citas.query().$promise;
             };

             $appto.inmuebles.addCitaUsuario = function(user, agent, date, day, month, year, hour, minutes, address, observations)
             {
                return $appto.$resources.citasResource.save(
                    {
                      usuario: user,
                      agente: agent,
                      fecha: date,
                      dia: day,
                      mes: month,
                      anio: year,
                      hora: hour,
                      minutos: minutes,
                      direccion_encuentro: address,
                      proceso_cita: '0',
                      observaciones: observations

                    }).$promise;
              };

              $appto.inmuebles.addCitaPropietario = function(user, agent, date, day, month, year, hour, minutes, address, observations)
              {
                return $appto.$resources.citasResource.save(
                    {
                      usuario: user,
                      agente: agent,
                      fecha: date,
                      dia: day,
                      mes: month,
                      anio: year,
                      hora: hour,
                      minutos: minutes,
                      direccion_encuentro: address,
                      proceso_cita: '1',
                      observaciones: observations

                    }).$promise;
              };

              $appto.inmuebles.addCitaContacto = function(user, agent, property, contact, date, day, month, year, hour, minutes, address, observations)
              {
                return $appto.$resources.citasResource.save(
                    {
                      usuario: user,
                      agente: agent,
                      inmueble: property,
                      solicitud_contacto: contact,
                      fecha: date,
                      dia: day,
                      mes: month,
                      anio: year,
                      hora: hour,
                      minutos: minutes,
                      direccion_encuentro: address,
                      proceso_cita: '2',
                      observaciones: observations

                    }).$promise;
             };

             $appto.inmuebles.getAllCitasByAgente = function(id_agente)
             {
                 return $appto.$resources.citasResource.query({agente:id_agente}).$promise;

             };

             //Utilities

             $appto.utils = $q.defer();

             $appto.utils.inmuebles = $q.defer();

             $appto.utils.inmuebles.favoritos = $q.defer();

             $appto.utils.inmuebles.favoritos.updateFavoritos=function()
             {
                 if($appto.isLoggedIn()) {

                     $appto.inmuebles.getAllInmueblesFavoritos().then(
                         function (data) {
                             inmuebles_favoritos=data;
                             },
                         function (data) {
                             console.error(data);
                         }
                     );
                 }
             };



            $appto.utils.inmuebles.favoritos.getFavoritos=function()
            {
                if($appto.isLoggedIn()) {
                    if (inmuebles_favoritos==null) {

                        $appto.utils.inmuebles.favoritos.updateFavoritos();
                        return [];
                    }else{

                        return inmuebles_favoritos;
                    }

                }
                return [];
            };



            $appto.utils.inmuebles.favoritos.isFavorito=function(inmueble_obj)
            {
                if($appto.isLoggedIn())
                {
                    if (inmuebles_favoritos==null) {

                        $appto.utils.inmuebles.favoritos.updateFavoritos();
                        return false;
                    }else{
                        var found = _.find(inmuebles_favoritos, function (inm) {
                            return inm.inmueble.id == inmueble_obj.id;
                        });

                        return found != null ? true : false;
                    }
                }else{
                    return false;
                }
            };



            $appto.utils.inmuebles.favoritos.addFavorito = function(inmueble_obj){

                var deferred = $q.defer();

                if($appto.isLoggedIn())
                {
                    $appto.inmuebles.addInmuebleFavorito(inmueble_obj.id).then(
                        function(msg){
                            $appto.utils.inmuebles.favoritos.updateFavoritos();
                            deferred.resolve({msg:"Tu inmueble ha sido agregado a tus favoritos.", data:msg});
                        },function(error){
                            deferred.reject({msg:"No ha sido posible agregar tu inmueble a favorito. Intenta más tarde.", data:error});
                        }
                    );
                }else{
                    deferred.reject({msg: "El usuario debe estar autenticado"});
                }
                return deferred.promise;
            };

            $appto.utils.inmuebles.favoritos.deleteFavorito = function(inmueble_obj){

                var deferred = $q.defer();

                if($appto.isLoggedIn())
                {
                    if (inmuebles_favoritos!=null) {

                        var found = _.find(inmuebles_favoritos, function (inmueble) {
                            return inmueble.inmueble.id == inmueble_obj.id;
                        });

                        $appto.inmuebles.deleteInmuebleFavorito(found.id).then(function (data) {
                            $appto.utils.inmuebles.favoritos.updateFavoritos();
                            deferred.resolve({msg:"Tu inmueble ha sido quitado de tus favoritos.", data:data});
                        },function(error){
                            deferred.reject({msg:"No ha sido posible eliminar el inmueble de favorito. Intenta más tarde.", data:error});
                        });

                    }else{
                        deferred.reject({msg: "No se pudo tener los inmuebles favoritos."});
                    }
                }else{
                    deferred.reject({msg: "El usuario debe estar autenticado"});
                }
                return deferred.promise;
            };

            $appto.utils.inmuebles.favoritos.toogleFavorito=function(inmueble_obj)
            {
                if($appto.isLoggedIn())
                {
                    if($appto.utils.inmuebles.favoritos.isFavorito(inmueble_obj))
                    {
                        $appto.utils.inmuebles.favoritos.deleteFavorito(inmueble_obj);
                    }else{
                        $appto.utils.inmuebles.favoritos.addFavorito(inmueble_obj);
                    }
                }
            };


            $appto.utils.usuarios = $q.defer();

            $appto.utils.usuarios.usuario = $q.defer();

            $appto.utils.usuarios.usuario.updateAgente=function(nombre, apellido, email, telefono, descripcion, precio_arriendo_min, precio_venta_min, tipos_de_inmueble, tipos_de_negocio, zonas_appto)
            {
                var deferred = $q.defer();

                if($appto.isLoggedIn()) {
                    if($appto.isAgent())
                    {

                      var obj_update_user = {};

                      var obj_update_agente = {};


                      if (nombre != null && !(nombre === undefined)) {
                          if (nombre != $appto.getUserData().usuario.first_name) {
                              obj_update_user.first_name = nombre;
                          }
                      }

                      if (apellido != null && !(apellido === undefined)) {
                          if (apellido != $appto.getUserData().usuario.last_name) {
                              obj_update_user.last_name = apellido;
                          }
                      }


                      if (email != null && !(email === undefined)) {
                          if (email != $appto.getUserData().usuario.email) {
                              obj_update_user.email = email;
                          }
                      }

                      if (telefono != null && !(telefono === undefined)) {
                          if (telefono != $appto.getUserData().telefono_contacto) {
                            obj_update_agente.telefono_contacto = telefono;
                          }
                      }

                      if (descripcion != null && !(descripcion === undefined)) {
                          if (descripcion != $appto.getUserData().descripcion) {
                            obj_update_agente.descripcion = descripcion;
                          }
                      }

                      obj_update_agente.precio_arriendo_min = precio_arriendo_min;
                      obj_update_agente.precio_venta_min = precio_venta_min;
                      obj_update_agente.tipos_de_inmueble = tipos_de_inmueble;
                      obj_update_agente.tipos_de_negocio = tipos_de_negocio;
                      obj_update_agente.zonas_appto = zonas_appto;

                      if(Object.keys(obj_update_user).length>0)
                      {
                          obj_update_user.id=$appto.getUserData().usuario.usuario.id;
                          $appto.$resources.userResource.patch({id:$appto.getUserData().usuario.usuario.id},
                              obj_update_user).$promise.then(
                              function (data){

                                  if(Object.keys(obj_update_agente).length>0)
                                  {
                                    obj_update_agente.id=$appto.getUserData().usuario.id;
                                      $appto.$resources.agenteResource.patch({id:$appto.getUserData().usuario.id},
                                      obj_update_agente).$promise.then(
                                          function(data){
                                              deferred.resolve({msg:"El agente se actualizó correctamente."});
                                          },
                                          function(error){
                                              deferred.reject({msg:"El objeto user se actualizó correctamente, pero el agente no.", data:error});
                                          }
                                      );
                                  }else{
                                      deferred.resolve({msg:"El agente se actualizó correctamente."});
                                  }

                              },
                              function (error){
                                  deferred.reject({msg:"Problema actualizando los datos. Es posible que ese correo esté siendo usado por otro usuario.", data:error});
                              }
                          );
                      }if(Object.keys(obj_update_agente).length>0){
                        obj_update_agente.id=$appto.getUserData().usuario.id;
                          $appto.$resources.agenteResource.patch({id:$appto.getUserData().usuario.id},
                          obj_update_agente).$promise.then(
                              function(data){
                                  deferred.resolve({msg:"El agente se actualizó correctamente."});
                                  $appto.getStorage().setItem('user_data', JSON.stringify(user_data));
                              },
                              function(error){
                                  deferred.reject({msg:"El objeto agente no se actualizó correctamente", data:error});
                              }
                          );
                      }

                    }
                    else{
                        deferred.reject({msg:"Usuario user cannot be updated."})
                    }
                }else{
                    deferred.reject({msg:"Most be authenticated to use this feature."})
                }

                return deferred.promise;
            };


            $appto.utils.usuarios.usuario.updateUsuario=function(nombre, apellido, email, telefono)
            {
                var deferred = $q.defer();

                if($appto.isLoggedIn()) {
                    if(!$appto.isAgent())
                    {
                        var obj_update_user = {};


                        var obj_update_usuario = {};

                        if (nombre != null && !(nombre === undefined)) {
                            if (nombre != $appto.getUserData().usuario.first_name) {
                                obj_update_user.first_name = nombre;
                            }
                        }

                        if (apellido != null && !(apellido === undefined)) {
                            if (apellido != $appto.getUserData().usuario.last_name) {
                                obj_update_user.last_name = apellido;
                            }
                        }


                        if (email != null && !(email === undefined)) {
                            if (email != $appto.getUserData().usuario.email) {
                                obj_update_user.email = email;
                            }
                        }

                        if (telefono != null && !(telefono === undefined)) {
                            if (telefono != $appto.getUserData().telefono_contacto) {
                                obj_update_usuario.telefono_contacto = telefono;

                            }
                        }


                        if(Object.keys(obj_update_user).length>0)
                        {
                            obj_update_user.id=$appto.getUserData().usuario.usuario.id;
                            $appto.$resources.userResource.patch({id:$appto.getUserData().usuario.usuario.id},
                                obj_update_user).$promise.then(
                                function (data){

                                    if(Object.keys(obj_update_usuario).length>0)
                                    {
                                        obj_update_usuario.id=$appto.getUserData().usuario.id;
                                        $appto.$resources.usuarioResource.patch({id:$appto.getUserData().usuario.id},
                                            obj_update_usuario).$promise.then(
                                            function(data){
                                                deferred.resolve({msg:"El usuario se actualizó correctamente."});
                                            },
                                            function(error){
                                                deferred.reject({msg:"El objeto user se actualizó correctamente, pero el usuario no.", data:error});
                                            }
                                        );
                                    }else{
                                        deferred.resolve({msg:"El usuario se actualizó correctamente."});
                                    }

                                },
                                function (error){
                                    deferred.reject({msg:"Problema actualizando los datos. Es posible que ese correo esté siendo usado por otro usuario.", data:error});
                                }
                            );
                        }if(Object.keys(obj_update_usuario).length>0){
                            obj_update_usuario.id=$appto.getUserData().usuario.id;
                            $appto.$resources.usuarioResource.patch({id:$appto.getUserData().usuario.id},
                                obj_update_usuario).$promise.then(
                                function(data){
                                    deferred.resolve({msg:"El usuario se actualizó correctamente."});
                                    $appto.getStorage().setItem('user_data', JSON.stringify(user_data));
                                },
                                function(error){
                                    deferred.reject({msg:"El objeto usuario no se actualizó correctamente", data:error});
                                }
                            );
                        }

                    }
                    else{
                        deferred.reject({msg:"Agent user cannot be updated."})
                    }
                }else{
                    deferred.reject({msg:"Most be authenticated to use this feature."})
                }

                return deferred.promise;
            };

            $rootScope.$on('ngAppto:ERROR:401', function (event, data) {
                if($appto.isLoggedIn)
                {
                    $appto.logout(data);
                }

            });

            $appto.utils.usuarios.usuario.updateAgenteUsuario=function(nuevoAgente)
            {
                var deferred = $q.defer();

                if($appto.isLoggedIn()) {
                    if(!$appto.isAgent())
                    {
                        var obj_update_usuario = {};

                        if (nuevoAgente.id != null && !(nuevoAgente.id === undefined)) {
                            if (nuevoAgente.id != $appto.getUserData().usuario.agente.id) {

                              obj_update_usuario.agente=nuevoAgente.id;
                              console.log("Cambio de agente");
                            }
                        }

                        if(Object.keys(obj_update_usuario).length>0){
                            obj_update_usuario.id=$appto.getUserData().usuario.id;
                            $appto.$resources.usuarioResource.patch({id:$appto.getUserData().usuario.id},
                                obj_update_usuario).$promise.then(
                                function(data){
                                    deferred.resolve({msg:"El Agente se actualizó correctamente."});
                                    user_data.usuario.agente=nuevoAgente;
                                    $appto.getStorage().setItem('user_data', JSON.stringify(user_data));
                                },
                                function(error){
                                    deferred.reject({msg:"El objeto usuario no se actualizó correctamente", data:error});
                                }
                            );
                        }

                    }
                    else{
                        deferred.reject({msg:"Agent user cannot be updated."})
                    }
                }else{
                    deferred.reject({msg:"Most be authenticated to use this feature."})
                }

                return deferred.promise;
            };

            $appto.utils.usuarios.usuario.assignAgentWhenCreateUser=function(nuevoAgente, usuario)
            {
                var deferred = $q.defer();

                if($appto.isLoggedIn()) {
                    if($appto.isAgent())
                    {
                        var obj_update_usuario = {};

                        if (nuevoAgente.id != null && !(nuevoAgente.id === undefined)) {
                              obj_update_usuario.agente=nuevoAgente.id;
                        }

                        if(Object.keys(obj_update_usuario).length>0){
                            obj_update_usuario.id=usuario.id;
                            $appto.$resources.agenteAsUsuarioResource.patch({id:obj_update_usuario.id},
                                obj_update_usuario).$promise.then(
                                function(data){
                                    deferred.resolve({msg:"El Agente se actualizó correctamente."});
                                    $appto.inmuebles.getAgentePublico(nuevoAgente.id).then(
                                        function (data)
                                        {
                                          user_data.usuario.agente = data[0];
                                          $appto.getStorage().setItem('user_data', JSON.stringify(user_data));
                                            console.log('Cambio de agente por id');
                                        }
                                    );
                                },
                                function(error){
                                    deferred.reject({msg:"El objeto usuario no se actualizó correctamente", data:error});
                                }
                            );
                        }

                    }
                }else{
                    deferred.reject({msg:"Most be authenticated to use this feature."})
                }

                return deferred.promise;
            };

            $appto.utils.usuarios.usuario.updateAgenteUsuarioId=function(nuevo_agente_id)
            {
                var deferred = $q.defer();

                if($appto.isLoggedIn()) {
                    if(!$appto.isAgent())
                    {
                        var obj_update_usuario = {};

                        if (nuevo_agente_id != null && !(nuevo_agente_id === undefined)) {

                          if($appto.getUserData().usuario.agente != null)
                          {
                            if (nuevo_agente_id != $appto.getUserData().usuario.agente.id) {

                              obj_update_usuario.agente=nuevo_agente_id;
                              console.log("Cambio de agente");
                            }else {
                              obj_update_usuario.agente=$appto.getUserData().usuario.agente.id;
                              console.log("Mismo agente");
                            }
                          }else {
                            obj_update_usuario.agente=nuevo_agente_id;
                            console.log("Nuevo agente");
                          }
                        }
                        if(Object.keys(obj_update_usuario).length>0){
                            obj_update_usuario.id=$appto.getUserData().usuario.id;
                            $appto.$resources.usuarioResource.patch({id:$appto.getUserData().usuario.id},
                                obj_update_usuario).$promise.then(
                                function(data){
                                  console.log(data);
                                    deferred.resolve({msg:"El Agente se actualizó correctamente."});
                                    $appto.inmuebles.getAgentePublico(nuevo_agente_id).then(
                                        function (data)
                                        {
                                          user_data.usuario.agente = data[0];
                                          $appto.getStorage().setItem('user_data', JSON.stringify(user_data));
                                            console.log('Cambio de agente por id');
                                        }
                                    );
                                },
                                function(error){
                                    deferred.reject({msg:"El objeto usuario no se actualizó correctamente", data:error});
                                }
                            );
                        }
                    }
                    else{
                        deferred.reject({msg:"Agent user cannot be updated."})
                    }
                }else{
                    deferred.reject({msg:"Most be authenticated to use this feature."})
                }
                return deferred.promise;
            };

            $appto.utils.usuarios.usuario.getUsuarioByEmail=function(usuario_email)
            {
                var deferred = $q.defer();
                $appto.$resources.usuarioResource.query({'username':usuario_email}).$promise.then(
                  function (data)
                  {
                      deferred.resolve(data);
                  },
                  function(error){
                      deferred.reject({data:error});
                  }
                );
                return deferred.promise;
            }

            $rootScope.$on('ngAppto:ACTION:Logout', function (event, data) {
                isLoggedIn = false;
                isFacebookUser = false;
                isAgent = false;
                user_data = null;
                $http.defaults.headers.common.Authorization = null;
                inmuebles_favoritos = null;
                $appto.getStorage().removeItem("user_data");
            });

            $rootScope.$on('ngAppto:ACTION:Login', function (event, data) {
                //$appto.utils.inmuebles.favoritos.updateFavoritos();
                console.log(isAgent?'es agente':'es usuario');
            });

            $rootScope.$on('ngAppto:ACTION:Register', function (event, data) {
                console.log(isAgent?'es agente':'es usuario');
            });















            //Return appto object

            return $appto;

        }];
    }).factory("ngApptoHttpResponseInterceptor", [ '$q','$rootScope', function($q, $rootScope){
        return {
            'responseError': function(rejection){
                if(rejection.status==401){
                    $rootScope.$broadcast('ngAppto:ERROR:401',rejection);
                }else if(rejection.status==403){
                    $rootScope.$broadcast('ngAppto:ERROR:403',rejection);
                }
                return $q.reject(rejection);
            }
        }
    }]);
