export const handleAPIerror = (error, res) => {
    console.log(error)
    if (error.response) {
        // handlovanie specifickych error messagov
        if (error.response.status === 404) {
            return res.status(404).json({
                status: 'error',
                message: 'Nebolo možné vygenerovať odpoveď',
                data: null,
            })
        }
        //unauthorized
        if (error.response.status === 403) {
            return res.status(403).json({
                status: 'error',
                message: 'Neautorizovaný prístup',
                data: null,
            })
        }
    }

    //genericky error, chyba na strane openai alebo nieco je zle nakonfigurovane
    console.error('Celý error detail:', error)
    res.status(500).json({
        status: 'error',
        message: 'Chyba pri spracovaní požiadavky',
        data: null,
    })
}
