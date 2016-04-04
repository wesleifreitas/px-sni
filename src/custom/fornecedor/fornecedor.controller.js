define(['../controllers/module'], function(controllers) {
    'use strict';

    // Controller
    controllers.controller('FornecedorCtrl', FornecedorCtrl);

    FornecedorCtrl.$inject = ['FornecedorService', 'pxConfig', '$scope', '$element', '$attrs', '$mdDialog'];

    function FornecedorCtrl(FornecedorService, pxConfig, $scope, $element, $attrs, $mdDialog) {
        // Variáveis gerais - Start
        /**
         * Variável de controle de visualição do Filtro Avançado
         * @type {Boolean}
         */
        $scope.expand = false;
        /**
         * Responsável por realizar o efeito de expandir o Filtro Avançado
         * @return {Void}
         */
        $scope.showFilter = function() {
            var $header = $('#headerSearch');
            var $content = $header.next();
            $content.slideToggle(500, function() {});
            $scope.filterExpand = !$scope.filterExpand;
            $header.blur();
        };

        // Configuração do exe2_id
        $scope.exe2_id_searchConfig = {
            table: 'dbo.Fornecedor2',
            group: false,
            fields: [{
                title: '',
                labelField: true,
                field: 'exe2_categoria',
                search: true,
                type: 'string',
                filterOperator: '%LIKE%'
            }, {
                title: 'Descrição: ',
                descriptionField: true,
                field: 'exe2_descricao',
            }, {
                title: '',
                field: 'exe2_id',
            }]
        };
        // Variáveis gerais - End

        // Define as opções de status
        $scope.dataStatus = {
            // Array: opções do select com opção 'Todos'
            optionsAll: FornecedorService.status(true),
            // Array: opções do select sem opção 'Todos'
            options: FornecedorService.status(false),
        };

        // Filtro - Start 

        // Default de options para o filtro filtroStatus
        $scope.filtroStatus = FornecedorService.status(true)[0];

        $scope.filtro_exe2_id_searchControl = {};

        filtro_exe2_id_ctrl.$inject = ['$scope', '$mdDialog'];
        $scope.filtro_exe2_id_searchClick = function() {
            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                controller: filtro_exe2_id_ctrl,
                templateUrl: 'custom/Fornecedor2/Fornecedor2-list.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        }

        // Filtro - End

        // Listagem - Start

        /**
         * Controle da listagem
         * Note que a propriedade 'control' da directive px-data-grid é igual a 'dgFornecedor'
         * Fornecedor: <px-data-grid px-control='dgFornecedor'>
         * @type {Object}
         */
        $scope.dgFornecedorControl = {};

        /**
         * Inicializa listagem
         * @return {Void}
         */
        $scope.dgFornecedorInit = function() {
            /**
             * Configurações da listagem
             * - fields: Colunas da listagem
             * @type {Object}
             */
            $scope.dgFornecedorConfig = {
                table: 'dbo.RMS_E_Fornecedores',
                view: 'dbo.RMS_E_Fornecedores',
                orderBy: 'FornecedorCliente_RazaoSocialNomePessoal',
                //group: true,
                fields: [{
                    pk: true,
                    visible: false,
                    title: 'id',
                    field: 'FornecedorCliente_ID'
                }, {
                    title: 'Pessoa',
                    field: 'FornecedorCliente_Pessoa',
                    type: 'string'
                }, {
                    title: 'Razao Social / Nome Pessoal',
                    field: 'FornecedorCliente_RazaoSocialNomePessoal',
                    type: 'string',
                    filter: 'filtroNome',
                    filterOperator: '%LIKE%'
                }, {
                    title: 'CNPJ',
                    field: 'FornecedorCliente_CnpjCpf',
                    type: 'string',
                }, {
                    title: 'Responsável',
                    field: 'FornecedorCliente_Responsavel',
                    type: 'string'
                }, {
                    title: 'Telefone',
                    field: 'FornecedorCliente_Telefone',
                    type: 'string'
                }, {
                    title: 'Atividade',
                    field: 'FornecedorCliente_RamoAtividade',
                    type: 'string'
                }],
                where: [{
                    field: 'empresa',
                    type: 'int',                    
                    filterOperator: '=',
                    filterValue: 9
                }]
            };
        };

        /**
         * Atualizar dados da listagem
         * @return {Void}
         */
        $scope.getData = function() {
            //Recuperar dados para a listagem
            $scope.dgFornecedorControl.getData();
        };

        /**
         * Remover itens da listagem
         * @return {Void}
         */
        $scope.remove = function() {
            return;
            // Remover itens (selecionados) da listagem
            $scope.dgFornecedorControl.remove();
        };

        // Listagem - End     

        // Inicializar título do formulário      
        $scope.formTitle = 'Formulário de Adicionar';
        /**
         * Alterar título do formulário
         */
        $scope.setFormTitle = function() {
            if ($scope.formShow === 'default') {
                if ($scope.formAction === 'insert') {
                    $scope.formTitle = 'Formulário de Adicionar';
                } else {
                    $scope.formTitle = 'Formulário de Editar';
                }
            } else if ($scope.formShow === 'Fornecedor2') {
                $scope.formTitle = 'Selecione uma categoria';
            }
        }


        formCtrl.$inject = ['$scope', '$mdDialog'];
        $scope.add = function(event) {
            return;
            $scope.formAction = 'insert';
            $scope.setFormTitle();

            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                controller: formCtrl,
                templateUrl: 'custom/Fornecedor/Fornecedor-form.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: false
            });
        };

        $scope.edit = function(event) {
            return;
            $scope.formAction = 'update';
            $scope.formItemEdit = event.itemEdit;
            $scope.setFormTitle();

            $mdDialog.show({
                scope: $scope,
                preserveScope: true,
                controller: formCtrl,
                templateUrl: 'custom/Fornecedor/Fornecedor-form.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: false
            });
        };
    }
    // Controller - filtro_exe2_id
    function filtro_exe2_id_ctrl($scope, $mdDialog) {
        $scope.callback = function(event) {
            $scope.filtro_exe2_id_searchControl.setValue(event.itemClick);
            $mdDialog.hide();
        };
    }
    // Controller - Formulário
    function formCtrl($scope, $mdDialog) {
        /**
         * Controle do formulário
         * Note que a propriedade 'control' da directive px-form é igual a 'formControl'
         * Fornecedor: <px-form px-control='formControl'>
         * @type {Object}
         */
        $scope.formControl = {};

        // Controle do campo exe2_id
        $scope.exe2_id_searchControl = {};
        // Clicar no botão busca
        $scope.exe2_id_searchClick = function() {
            $scope.formShow = 'Fornecedor2';
            $scope.setFormTitle();
        };

        /**
         * Inicializa formulário
         * @return {Void}
         */
        $scope.formInit = function() {
            // Definir formulário default
            $scope.formShow = 'default';

            // Limpar formuário
            $scope.formControl.clean();

            // Configurar formulário
            $scope.formConfig = {
                table: 'dbo.Fornecedor',
                view: 'dbo.vw_Fornecedor',
                fields: [{
                    pk: true,
                    field: 'exe_id',
                    type: 'string',
                    identity: true
                }, {
                    field: 'exe_checkbox',
                    type: 'bit',
                    element: 'exe_checkbox'
                }, {
                    field: 'exe_checkbox_char',
                    type: 'string',
                    element: 'exe_checkbox_char',
                    fieldValueOptions: {
                        checked: 'A',
                        unchecked: 'B'
                    }
                }, {
                    field: 'exe_nome',
                    type: 'string',
                    element: 'exe_nome',
                }, {
                    field: 'exe_cpf',
                    type: 'string',
                    element: 'exe_cpf'
                }, {
                    field: 'exe_telefone',
                    type: 'string',
                    element: 'exe_telefone'
                }, {
                    field: 'exe_cep',
                    type: 'string',
                    element: 'exe_cep'
                }, {
                    field: 'exe2_id',
                    type: 'string',
                    element: 'exe2_id',
                    fieldValueOptions: {
                        selectedItem: 'exe2_id',
                        labelField: 'exe2_categoria'
                    },
                }, {
                    field: 'exe_senha',
                    type: 'string',
                    element: 'exe_senha',
                    hash: true
                }, {
                    field: 'exe_senha_confirmar',
                    type: 'string',
                    element: 'exe_senha_confirmar',
                    select: false,
                    insert: false,
                    update: false
                }]
            }

            if ($scope.formAction == 'update') {
                $scope.formControl.select($scope.formItemEdit);
            }
        };

        /**
         * Inserir registro
         * @return {[type]} [description]
         */
        $scope.formInsert = function() {
            $scope.formControl.insert();
            $mdDialog.hide();
        };

        /**
         * Atualizar
         * @return {[type]} [description]
         */
        $scope.formUpdate = function(form) {
            $scope.formControl.update();
            $mdDialog.hide();
        };

        /**
         * Função callback do formulário
         * @param  {Object} event retorno do formulário
         * @return {Void}
         */
        $scope.formCallback = function(event) {
            if (event.action === 'select') {
                $scope.exe_senha_confirmar = event.qQuery[0].EXE_SENHA;
            } else if (event.action == 'insert') {
                // Adicionar registro na listagem
                $scope.dgFornecedorControl.addDataRow(event.data);
            } else if (event.action == 'update') {
                // Atualizar registro na listagem
                $scope.dgFornecedorControl.updateDataRow(event.data);
            }
        };

        /**
         * Fechar formulário
         * @return {Void}
         */
        $scope.formCancel = function() {
            if ($scope.formShow === 'default') {
                $mdDialog.cancel();
            } else {
                $scope.formShow = 'default';
            }
        };

        /**
         * Limpar formulário
         * @return {Void}
         */
        $scope.formClean = function() {
            // Limpar formuário
            $scope.formControl.clean();
        };

        // Controle da listagem no formulário
        $scope.dgFornecedor2Control = {};

        /**
         * Inicializar listagem
         * @return {Void}
         */
        $scope.dgFornecedor2Init = function() {
            /**
             * Configurações da listagem
             * - fields: Colunas da listagem
             * @type {Object}
             */
            $scope.dgFornecedor2Config = {
                table: 'dbo.Fornecedor2',
                group: false,
                fields: [{
                    pk: true,
                    title: 'id',
                    field: 'exe2_id',
                    type: 'int'
                }, {
                    title: 'Categoria',
                    field: 'exe2_categoria',
                    type: 'string',
                    filter: 'filtroCategoria',
                    filterOperator: '%LIKE%'
                }, {
                    title: 'Descrição',
                    field: 'exe2_descricao',
                    type: 'string'
                }],
            };
        };

        // Atualizar listagem do formulário
        $scope.getDataFornecedor2 = function() {
            //Recuperar dados para a listagem
            $scope.dgFornecedor2Control.getData();
        };

        // Evento itemClick
        $scope.dgFornecedor2ItemClick = function(event) {
            $scope.formShow = 'default';
            $scope.exe2_id_searchControl.setValue(event.itemClick);
            $scope.setFormTitle();
        };
    }
});