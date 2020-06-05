const nock = require('nock')

export default () => {
nock('http://127.0.0.1:5000')
  .persist()
  .get('/foo')
  .reply(200, {bar: 'bar'})
/* nock('http: */
/*   .persist() */
/*   .post('/api/3/action/group_show', {"id":"test-group"}) */
/*   .reply(200, {"help":"http://127.0.0.1:5000/api/3/action/help_show?name=group_show","success":true,"result":{"approval_status":"approved","image_display_url":"https://datahub.io/static/img/awesome-data/economic-data.png","package_count":2,"title":"Economic Data","title_en":"","name":"test-group","is_organization":false,"image_url":"https://datahub.io/static/img/awesome-data/economic-data.png","groups":[],"type":"group","users":[{"capacity":"admin","name":"test_sysadmin_00"}],"title_da_DK":"","num_followers":0,"id":"29a82d2f-11c5-48e2-884b-0f34d936bedd","tags":[],"description":"A collection of economic indicators available on DataHub."}}, [ 'Server', */
/*   'PasteWSGIServer/0.5 Python/2.7.12', */
/*   'Date', */
/*   'Mon, 10 Jun 2019 13:56:03 GMT', */
/*   'Content-Type', */
/*   'application/json;charset=utf-8', */
/*   'Content-Length', */
/*   '670' ]) */
}
