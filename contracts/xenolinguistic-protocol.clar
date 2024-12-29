;; Xenolinguistic Protocol Contract

(define-data-var last-protocol-id uint u0)

(define-map protocols
  { protocol-id: uint }
  {
    creator: principal,
    name: (string-ascii 100),
    description: (string-utf8 1000),
    content: (string-utf8 10000),
    status: (string-ascii 20),
    votes: uint
  }
)

(define-map protocol-contributors
  { protocol-id: uint, contributor: principal }
  { contributed: bool }
)

(define-public (create-protocol (name (string-ascii 100)) (description (string-utf8 1000)) (content (string-utf8 10000)))
  (let
    (
      (new-id (+ (var-get last-protocol-id) u1))
    )
    (map-set protocols
      { protocol-id: new-id }
      {
        creator: tx-sender,
        name: name,
        description: description,
        content: content,
        status: "active",
        votes: u0
      }
    )
    (map-set protocol-contributors
      { protocol-id: new-id, contributor: tx-sender }
      { contributed: true }
    )
    (var-set last-protocol-id new-id)
    (ok new-id)
  )
)

(define-public (update-protocol (protocol-id uint) (content (string-utf8 10000)))
  (let
    (
      (protocol (unwrap! (map-get? protocols { protocol-id: protocol-id }) (err u404)))
    )
    (asserts! (is-eq (get status protocol) "active") (err u403))
    (map-set protocols
      { protocol-id: protocol-id }
      (merge protocol { content: content })
    )
    (map-set protocol-contributors
      { protocol-id: protocol-id, contributor: tx-sender }
      { contributed: true }
    )
    (ok true)
  )
)

(define-public (vote-protocol (protocol-id uint))
  (let
    (
      (protocol (unwrap! (map-get? protocols { protocol-id: protocol-id }) (err u404)))
    )
    (asserts! (is-eq (get status protocol) "active") (err u403))
    (map-set protocols
      { protocol-id: protocol-id }
      (merge protocol { votes: (+ (get votes protocol) u1) })
    )
    (ok true)
  )
)

(define-read-only (get-protocol (protocol-id uint))
  (ok (map-get? protocols { protocol-id: protocol-id }))
)

(define-read-only (get-contributor (protocol-id uint) (contributor principal))
  (ok (map-get? protocol-contributors { protocol-id: protocol-id, contributor: contributor }))
)

