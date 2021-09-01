# Rari Capital API

### Get supply history for the last 30 days

`GET /history/supply/:pool` - returns array of objects.
- object is of type `{date: Unix Epoch in milliseconds, totalSupply: number in USD}`

### Get APY history for the last 30 days
`GET /history/api/:pool` - returns array of objects.
- object is of type `{date: Unix Epoch in milliseconds, poolAPY: number}`

##### :pool can be USDC (stable pool) or DAI (dai pool).