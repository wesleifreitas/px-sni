define(['../services/module'], function (services) {
    'use strict';

    services.factory('FornecedorService', FornecedorService);

    FornecedorService.$inject = ['pxConfig', 'pxArrayUtil'];

    function FornecedorService(pxConfig, pxArrayUtil) {

        var service = {};

        service.status = status;

        return service;

        /**
         * '[status description]'
         * @param  {[type]} showAll [description]
         * @return {[type]}         [description]
         */
        function status(showAll) {

            var arrayData = [];

            if (showAll) {
                arrayData = [{
                    name: 'Todos',
                    id: '%'
                }, {
                    name: 'Ativo',
                    id: 1
                }, {
                    name: 'Inativo',
                    id: 0
                }];
            } else {
                arrayData = [{
                    name: 'Ativo',
                    id: 1
                }, {
                    name: 'Inativo',
                    id: 0
                }];
            }

            return arrayData.sort(pxArrayUtil.sortOn('id'));
        }
    }
});
