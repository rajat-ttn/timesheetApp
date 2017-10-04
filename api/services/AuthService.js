
module.exports = {
    verifyCredentials: (token, tokenSecret, profile, done) => {
        process.nextTick(function() {
            User.findOne({uid: profile.id}, function(err, user) {
                if (!user) {
                    var data = {
                        uid: profile.id
                        , name: profile.displayName
                    };

                    if (profile.emails && profile.emails[0] && profile.emails[0].value) {
                        data.email = profile.emails[0].value;
                    }
                    if (profile.photos && profile.photos[0] && profile.photos[0].value) {
                        data.image = profile.photos[0].value;
                    }

                    User.create(data).exec((err, data) => {
                        if(data){
                            data.token = token;
                        }
                        done(err, data);
                    });
                } else {
                    if(user){
                        user.token = token;
                    }
                    done(err, user);
                }
            });
        });
    }
}