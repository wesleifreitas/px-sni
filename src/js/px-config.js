define(['angular'], function(ng) {
	'use strict';

	var PX_PACKAGE = 'lib/px-project/dist/' // Package Phoenix Project

	var config = ng.module('pxConfig', [])
		.constant('pxConfig', {
			PX_PACKAGE: PX_PACKAGE, // Package Phoenix Project
			LIB: 'lib/', // Componentes externos
			PROJECT_ID: 3, // Identificação do projeto (table: px.project)
			PROJECT_NAME: 'Phoenix Project - sni', // Nome do projeto
			PROJECT_SRC: 'px-sni/src/', // Source do projeto
			PROJECT_CSS: [PX_PACKAGE + 'system/login/login.css', 'styles.css'], // Arquivos .css
			PROJECT_DSN: 'sisgestao_sql5', // Data Source Name (CF)
			LOCALE: 'pt-BR', // Locale
			LOGIN_REQUIRED: true, // Login obrigatório?
			GROUP: false, // Agrupar dados?
			GROUP_TABLE: 'grupo', // Tabela Group
			GROUP_ITEM_SUFFIX: '', // Sufixo do campo GROUP_ITEM
			GROUP_LABEL_SUFFIX: '', // Sufixo do campo GROUP_LABEL
			GROUP_REPLACE: [], // Substituir no nome do campo GROUP
			GROUP_ITEM: 'grupo_id', // Idetificador de GROUP (Utilizar quando GROUP_ITEM_SUFFIX === '')
			GROUP_LABEL: 'grupo_nome' // Label do GROUP (Utilizar quando GROUP_LABEL_SUFFIX === '')
		})

	return config;
});