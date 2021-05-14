const topup = () => {
  const price_data = [
    { coin: 100, price: 29 },
    { coin: 300, price: 79 },
    { coin: 500, price: 129 },
    { coin: 1000, price: 189 },
    { coin: 1500, price: 399 }
  ]

  return (
    <div>
      <h2 className="m-2">เติมเหรียญ</h2>
      <div className="px-2">
        <h5>เหรียญของฉัน: 0 เหรียญ</h5>
        {price_data.map((data) => {
          return (
            <div>
              <h5>
                <img
                  src="/coin.png"
                  alt="Coin"
                  width="16"
                  className="me-2 align-middle"
                />
                {data.coin} เหรียญ
                <button type="button" className="btn btn-yellow ms-3">
                  {data.price} บาท
                </button>
              </h5>
            </div>
          )
        })}

        {/* <table class="table">
          <tbody>
            {price_data.map((data) => {
              return (
                <tr>
                  <td>
                    <h5>
                      <img
                        src="/coin.png"
                        alt="Coin"
                        width="16"
                        className="me-2 align-middle"
                      />
                      {data.coin} เหรียญ
                    </h5>
                  </td>
                  <td>
                    <button type="button" className="btn btn-yellow ms-auto">
                      {data.price} บาท
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> */}
      </div>
    </div>
  )
}

export default topup
