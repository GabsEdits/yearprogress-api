<div align="center">
<h1>Year's Progress API</h1>
<p>A simple API to get the progress of the year</p>
</div>

---

## Usage

You can get the progress of the year by sending a `GET` request to the following
endpoint:

```
https://yearprogress.gxbs.dev
```

The response will be a JSON object with the following properties:

```json
{
  "progress": "82.19%",
  "days": 300,
  "remaining": "17.81%"
}
```

- `progress`: The progress of the year as a decimal number.
- `days`: The number of days that have passed in the year.
- `remaining`: The number of days left in the year.

### Other Endpoints

You can also get the progress of the year in a different format by sending a
`GET` request to the following endpoints:

- `/percentage`: Returns the progress of the year as a percentage.
- `/decimal`: Returns the progress of the year as a decimal number.
- `/days`: Returns the number of days that have passed in the year.
- `/remaining`: Returns the number of days left in the year.
  - `/remaining/days`: Returns the number of days left in the year.

## Why?

I created this API in the 300th day of the year to celebrate the progress of the
year, and it reminded me of how fast time flies. I hope you find it interesting
and maybe even useful!

## License

This project is under the Unlicense license. See the [LICENSE](./LICENSE.txt)
file for more information.

## Contributing

Feel free to contribute to this project by opening an issue or a pull request. I
would love to hear your feedback and suggestions!

It is build using [Hono](https://hono.dev) and [Deno](https://deno.com).
