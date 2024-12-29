;; Telescope Integration Contract

(define-data-var last-telescope-id uint u0)

(define-map telescopes
  { telescope-id: uint }
  {
    name: (string-ascii 100),
    location: (string-ascii 100),
    api-endpoint: (string-ascii 200)
  }
)

(define-map telescope-data
  { telescope-id: uint, timestamp: uint }
  { data: (string-utf8 10000) }
)

(define-public (register-telescope (name (string-ascii 100)) (location (string-ascii 100)) (api-endpoint (string-ascii 200)))
  (let
    (
      (new-id (+ (var-get last-telescope-id) u1))
    )
    (map-set telescopes
      { telescope-id: new-id }
      {
        name: name,
        location: location,
        api-endpoint: api-endpoint
      }
    )
    (var-set last-telescope-id new-id)
    (ok new-id)
  )
)

(define-public (submit-telescope-data (telescope-id uint) (data (string-utf8 10000)))
  (begin
    (asserts! (is-some (map-get? telescopes { telescope-id: telescope-id })) (err u404))
    (ok (map-set telescope-data
      { telescope-id: telescope-id, timestamp: block-height }
      { data: data }
    ))
  )
)

(define-read-only (get-telescope (telescope-id uint))
  (ok (map-get? telescopes { telescope-id: telescope-id }))
)

(define-read-only (get-telescope-data (telescope-id uint) (timestamp uint))
  (ok (map-get? telescope-data { telescope-id: telescope-id, timestamp: timestamp }))
)

