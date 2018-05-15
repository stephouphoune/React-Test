

const asyncHandler = handler => (req, res, next) => {

    handler(req, res)
        .then(() => next())
        .catch((e) => {

            console.log('An error occured', e)
            res.end(500);

        })

}