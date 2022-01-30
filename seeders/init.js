'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /** コードマスター */
    await queryInterface.bulkInsert('code_masters', [{
      code_master_id: 1,
      code_master_genre: 'JOB_GROUP_STATUS',
      code_master_value: 'PREPARING',
      code_master_name: '準備中',
      code_master_sort_order: 1,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 2,
      code_master_genre: 'JOB_GROUP_STATUS',
      code_master_value: 'RUNNING',
      code_master_name: '実行中',
      code_master_sort_order: 2,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 3,
      code_master_genre: 'JOB_GROUP_STATUS',
      code_master_value: 'SUCCESS_TERMINATION',
      code_master_name: '正常終了',
      code_master_sort_order: 3,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 4,
      code_master_genre: 'JOB_GROUP_STATUS',
      code_master_value: 'FAILED_TERMINATION',
      code_master_name: '異常終了',
      code_master_sort_order: 4,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 5,
      code_master_genre: 'JOB_STATUS',
      code_master_value: 'PREPARING',
      code_master_name: '準備中',
      code_master_sort_order: 1,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 6,
      code_master_genre: 'JOB_STATUS',
      code_master_value: 'RUNNING',
      code_master_name: '実行中',
      code_master_sort_order: 2,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 7,
      code_master_genre: 'JOB_STATUS',
      code_master_value: 'SUCCESS_TERMINATION',
      code_master_name: '正常終了',
      code_master_sort_order: 3,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 8,
      code_master_genre: 'JOB_STATUS',
      code_master_value: 'FAILED_TERMINATION',
      code_master_name: '異常終了',
      code_master_sort_order: 4,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 9,
      code_master_genre: 'USER_WIKI_PLAN',
      code_master_value: 'DEMO',
      code_master_name: 'デモ',
      code_master_sort_order: 1,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 10,
      code_master_genre: 'USER_WIKI_PLAN',
      code_master_value: 'BASIC',
      code_master_name: 'ベーシック',
      code_master_sort_order: 2,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 12,
      code_master_genre: 'USER_WIKI_PLAN',
      code_master_value: 'PRO',
      code_master_name: 'プロ',
      code_master_sort_order: 3,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 13,
      code_master_genre: 'USER_WIKI_PLAN',
      code_master_value: 'ENTERPRISE',
      code_master_name: 'エンタープライズ',
      code_master_sort_order: 4,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 14,
      code_master_genre: 'USER_WIKI_USE_STATUS',
      code_master_value: 'PREPARING',
      code_master_name: '準備中',
      code_master_sort_order: 1,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 15,
      code_master_genre: 'USER_WIKI_USE_STATUS',
      code_master_value: 'RUNNING',
      code_master_name: '利用中',
      code_master_sort_order: 2,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 16,
      code_master_genre: 'USER_WIKI_USE_STATUS',
      code_master_value: 'DELETING',
      code_master_name: '削除中',
      code_master_sort_order: 3,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }, {
      code_master_id: 17,
      code_master_genre: 'USER_WIKI_USE_STATUS',
      code_master_value: 'DELETED',
      code_master_name: '削除済み',
      code_master_sort_order: 4,
      code_master_created_at: new Date(),
      code_master_updated_at: new Date()
    }], {});
    /** Wikiグループ */
    await queryInterface.bulkInsert('wiki_groups', [{
      wiki_group_id: 1,
      wiki_group_name: 'Wikijs',
      wiki_group_official_url: 'https://js.wiki/',
      wiki_group_logo_url: 'https://d33wubrfki0l68.cloudfront.net/4f6939b6c203195133907e24da9964fa9afa4a68/3724c/assets/images/tool-icons/wikijs.png',
      wiki_group_created_at: new Date(),
      wiki_group_updated_at: new Date()
    }, {
      wiki_group_id: 2,
      wiki_group_name: 'GROWI',
      wiki_group_official_url: 'https://growi.org/',
      wiki_group_logo_url: 'https://d33wubrfki0l68.cloudfront.net/4f6939b6c203195133907e24da9964fa9afa4a68/3724c/assets/images/tool-icons/wikijs.png',
      wiki_group_created_at: new Date(),
      wiki_group_updated_at: new Date()
    }, {
      wiki_group_id: 3,
      wiki_group_name: 'Outline',
      wiki_group_official_url: 'https://www.getoutline.com/',
      wiki_group_logo_url: 'https://d33wubrfki0l68.cloudfront.net/4f6939b6c203195133907e24da9964fa9afa4a68/3724c/assets/images/tool-icons/wikijs.png',
      wiki_group_created_at: new Date(),
      wiki_group_updated_at: new Date()
    }, {
      wiki_group_id: 4,
      wiki_group_name: 'CROWI',
      wiki_group_official_url: 'https://site.crowi.wiki/',
      wiki_group_logo_url: 'https://d33wubrfki0l68.cloudfront.net/4f6939b6c203195133907e24da9964fa9afa4a68/3724c/assets/images/tool-icons/wikijs.png',
      wiki_group_created_at: new Date(),
      wiki_group_updated_at: new Date()
    }, {
      wiki_group_id: 5,
      wiki_group_name: 'Knowledge',
      wiki_group_official_url: 'https://information-knowledge.support-project.org/',
      wiki_group_logo_url: 'https://d33wubrfki0l68.cloudfront.net/4f6939b6c203195133907e24da9964fa9afa4a68/3724c/assets/images/tool-icons/wikijs.png',
      wiki_group_created_at: new Date(),
      wiki_group_updated_at: new Date()
    }], {});
    /** Wiki */
    await queryInterface.bulkInsert('wikis', [{
      wiki_id: 1,
      wiki_group_id: 1,
      wiki_version: '2.5.255',
      wiki_sort_order: 1,
      wiki_container_url: 'public.ecr.aws/q8s3t3u2/cloud-wiki-wikijs:2.5.255',
      wiki_created_at: new Date(),
      wiki_updated_at: new Date()
    },{
      wiki_id: 2,
      wiki_group_id: 1,
      wiki_version: '2.5.268',
      wiki_sort_order: 2,
      wiki_container_url: 'public.ecr.aws/q8s3t3u2/cloud-wiki-wikijs:2.5.268',
      wiki_created_at: new Date(),
      wiki_updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('code_masters', null, {});
    await queryInterface.bulkDelete('wiki_groups', null, {});
    await queryInterface.bulkDelete('wikis', null, {});
  }
};
