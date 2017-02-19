/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    findOne: function (req,res){
        User.findOne({
            screenName: req.param('screenName')
        }).exec(function(err, user) {
            if (err) return res.negatiate(err);
            if (!user) {
                return res.notFound();
            }
           // User.subscribe(req, user.id);

            Emoji.find({
                owner: user.id
            }).exec(function (err, emojis) {
                if (err) return res.negatiate(err);
                return res.view('profile', {
                    user: user,
                    emojis: emojis
                });
            });
        });
    }
};

