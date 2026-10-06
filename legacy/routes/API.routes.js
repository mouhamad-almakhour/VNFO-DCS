var express = require("express");
const router= express.Router()

const vnfd = require('../api_openstack/api_CreateToken_OS.js');
const vnf = require('../api_openstack/api_openstack/api_VNFM_OS.js');
const events = require('../api_openstack/api_openstack/api_EVNET_OS.js');
const createtoken = require('../api_openstack/api_openstack/api_CreateToken_OS.js');
const openstack_verion = require('../api_openstack/api_openstack/api_version_OS.js');

router.get('/token', async (req, res) =>{   
    const token = await  createtoken.token_POST()
    return res.status(200).json({ type: 'success', message: token });
})

router.get('/apiversion',async (req, res) =>{   
    const version = await  openstack_verion.GET_API_version()
    return res.status(200).json({ type: 'success', message: version });
})

router.get('/fetchres', (req, res) => {
  return res.status(200).json({ type: 'resources', message: ''});
})

router.get('/fetchvnf', (req, res) => {
  return res.status(200).json({type: 'VNF List',message: ''});
})

router.post('/metamaskid', (req, res) => {
metamaskaccount = req.body.account;
console.log(account);
  return res.status(200).json({type: 'success', account: metamaskaccount , message: 'ok'});
})

router.get('/events',async  (req, resp) => {
await createtoken.token_POST().then((token) =>{
      events.GET_openstack_EVNETS(token).then((res2) => {
                return resp.status(200).json({type: 'success', events:  res2 });
                })
          })
})

router.get('/openstackevents', (req, res) => {
const event= events.GET_openstack_EVNETS()
  return res.status(200).json({type: 'OpneStack events', message: event});
})

router.get('/blockchainevents', (req, res) => {
  return res.status(200).json({type:'BlockChain events', message: ''});
})

router.post('/createvnf', async (req, resp) => {
const vnfdParametres ={ "vnfd": { "tenant_id": "947990f3c04245a7afd59c6140dc155d", "name": "vnfd-test" +Math.random(), "description": "Sample example", "service_types": [ { "service_type": "vnfd" } ], "attributes": { "vnfd": { "tosca_definitions_version": "tosca_simple_profile_for_nfv_1_0_0", "description": "Demo example", "metadata": { "template_name": "sample-tosca-vnfd" }, "topology_template": { "node_templates": { "VDU1": { "type": "tosca.nodes.nfv.VDU.Tacker", "capabilities": { "nfv_compute": { "properties": { "num_cpus": req.body.cpu, "mem_size": req.body.memory+" MB", "disk_size": req.body.storage+" GB" } } }, "properties": { "image": "cirros-0.5.2-x86_64-disk" } }, "CP1": { "type": "tosca.nodes.nfv.CP.Tacker", "properties": { "order": 0, "management": true, "anti_spoofing_protection": false }, "requirements": [ { "virtualLink": { "node": "VL1" } }, { "virtualBinding": { "node": "VDU1" } } ] }, "VL1": { "type": "tosca.nodes.nfv.VL", "properties": { "vendor": "Tacker", "network_name": "mynetwork" } } } } } } }} 
console.log('start');
await createtoken.token_POST().then((token) =>{
        // console.log('token');
        //orchestrator.Create_VNFSC();
         vnfd.VNFD_Create(vnfdParametres,token).then((res1) =>  {;
            vnf.VNF_CREATE(token,res1.vnfd.id,'nfv1'+Math.random()).then((res2) =>   {
                  console.log(res2.vnf.id);
                  return resp.status(200).json({type: 'success', vnfid:  JSON.stringify(res2.vnf.id ), vnfdid :JSON.stringify(res2.vnf.vnfd_id) });
                              }
                  )}
              )})
          })           
// include in body:
// vnfid, cpu, storage, memory
router.post('/scalevnf',async  (req, resp) => {
     var body = req.body;
     const vnfdParametres ={ "vnfd": { "tenant_id": "947990f3c04245a7afd59c6140dc155d", "name": "vnfd-test" +Math.random(), "description": "Sample", "service_types": [ { "service_type": "vnfd" } ], "attributes": { "vnfd": { "tosca_definitions_version": "tosca_simple_profile_for_nfv_1_0_0", "description": "Demo example", "metadata": { "template_name": "sample-tosca-vnfd" }, "topology_template": { "node_templates": { "VDU1": { "type": "tosca.nodes.nfv.VDU.Tacker", "capabilities": { "nfv_compute": { "properties": { "num_cpus": req.body.cpu, "mem_size": req.body.memory+" MB", "disk_size": req.body.storage+" GB" } } }, "properties": { "image": "cirros-0.5.2-x86_64-disk" } }, "CP1": { "type": "tosca.nodes.nfv.CP.Tacker", "properties": { "order": 0, "management": true, "anti_spoofing_protection": false }, "requirements": [ { "virtualLink": { "node": "VL1" } }, { "virtualBinding": { "node": "VDU1" } } ] }, "VL1": { "type": "tosca.nodes.nfv.VL", "properties": { "vendor": "Tacker", "network_name": "mynetwork" } } } } } } }}

     //try OpenStack
     await createtoken.token_POST().then( (token) =>{ 
        vnf.GET_VNFD_by_id(token,req.body.vnfid).then((resp0) => {
              console.log(resp0)
              vnf.VNF_DELETE(token,req.body.vnfid).then((res) => {
                vnfd.VNFD_DELETE( token,resp0.vnf.vnfd_id).then((res) => {  
                      vnfd.VNFD_Create(vnfdParametres,token) .then((res) =>{
                                    vnf.VNF_CREATE(token,res.vnfd.id,'nfv-'+Math.random()).then((res2) =>   {
                                            console.log(res2); return resp.status(200).json({type: 'success', vnfid:  JSON.stringify(res2.vnf.id ), vnfdid :JSON.stringify(res2.vnf.vnfd_id) });       
                           })
                       })
                   })
                })
            })
        })
  })
           
router.post('/deletevnf', async (req, resp) => {
var body = req.body;
var vnfid =req.body.vnfid;
   
     //try OpenStack
    await createtoken.token_POST().then( (token) =>{ 
       vnf.GET_VNFD_by_id(token,req.body.vnfid).then((resp0) => {
            console.log(resp0)
            vnf.VNF_DELETE(token,req.body.vnfid).then((resp1) => { 
                    vnfd.VNFD_DELETE( token,resp0.vnf.vnfd_id).then((resp2) => { 
                                console.log(resp2); return resp.status(200).json({type: 'success', message :'ok' });       
                                                            })
                                                        })
                                                      })
                  })
   })

   module.exports= router;