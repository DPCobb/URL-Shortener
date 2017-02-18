/**
 *
 * Daniel Cobb
 * 2-7-2017
 * Assignment 3: Logging Tool
 *
 */

const url = require('../models/url.js');
const log = require('tynydebug');
const execFile = require('child_process').execFile;

const file = '/home/dc/.url/.git/hooks/post-receive.sample';

module.exports = (express) => {
  class dataHandle {
    constructor(data) {
      this.id = data;
    }
  }
    // call router method
  const router = express.Router();

  // redirect based on short url, used to redirect for tyny.io/URL
  router.get('/:url', (req, res) => {
      // get the url param
    const id = new dataHandle(req.params.url);
    // get one url back by short url value
    url.findOneUrl(id, (data) => {
      // set the redirect target
      const target = data.url;
      // if the url has http:// or https://
      if (target.includes('http') || target.includes('https')) {
        // redirect to target
        res.redirect(target);
        log.debug({
          type: 'success',
          msg: 'Redirected User to external URL',
          location: 'link.js line 15 GET:/:url',
          request: {
            target,
          },
        });
      } else {
        // if not add http and redirect
        res.redirect('http://' + target);
        log.debug({
          type: 'success',
          msg: 'Redirected User to external URL',
          location: 'link.js line 15 GET:/:url',
          request: {
            target,
          },
        });
      }
    }, (err, target) => {
      log.debug({
        type: 'error',
        msg: 'Redirect User to external URL failed',
        location: 'link.js line 15 GET:/:url',
        data: err,
        request: {
          target,
        },
      });
    });
  });
  // listens for webhook from deploy branch
  router.post('/', (req, res) => {
    if (req.body.ref) {
      log.debug({
        type: 'success',
        msg: 'Webhook recieved from Deploy branch',
        location: 'link.js line 67 POST:/',
      });
      const execOptions = {
        maxBuffer: 1024 * 1024,
      };
      execFile(file, execOptions, (error, stdout, stderr) => {
        if (error) {
          log.debug(`exec error: ${error}`);
          return;
        }
        log.debug(`stdout: ${stdout}`);
        log.debug(`stderr: ${stderr}`);
      });
    }
    res.status(200).json({ msg: 'Data received.' });
  });
  return router;
};
