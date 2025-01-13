# hash benchmark

Benchmarking different hashing algorithms.

Uses [mitata](https://github.com/evanwashere/mitata) for benchmarking.

```
$ clk: ~3.78 GHz
cpu: AMD Ryzen 7 5800X 8-Core Processor
runtime: node 22.12.0 (x64-linux)

benchmark                   avg (min … max) p75   p99    (min … top 1%)
------------------------------------------- -------------------------------
md5                          636.20 ms/iter 637.27 ms    █       █
                    (627.01 ms … 659.11 ms) 643.59 ms █▁▁██▁█▁█▁▁██▁▁█▁▁▁▁█
sha1                         565.34 ms/iter 567.00 ms   █      █
                    (550.40 ms … 597.48 ms) 586.18 ms ███▁▁▁█████▁▁▁▁▁▁▁▁▁█
sha256                       552.68 ms/iter 555.58 ms ▃    █
                    (542.91 ms … 570.00 ms) 569.09 ms █▆▁▆▁█▁▆▁▁▆▁▆▁▁▁▁▁▁▁▆
sha512                       619.68 ms/iter 621.53 ms           █
                    (608.96 ms … 639.81 ms) 626.20 ms ▆▁▁▆▁▁▆▆▁▁█▁▁▁▆▆▁▁▁▆▆
blake2b512                   598.29 ms/iter 603.78 ms █
                    (586.65 ms … 619.27 ms) 615.07 ms █▁█████▁▁█▁▁█▁█▁▁▁▁▁█
blake2s256                   669.25 ms/iter 670.34 ms   █     █    █
                    (661.49 ms … 683.88 ms) 675.15 ms █▁█▁▁▁▁▁███▁▁█▁▁▁▁█▁█
blake3                       629.22 ms/iter 631.85 ms  █          █
                    (618.61 ms … 664.10 ms) 635.81 ms ██▁▁██▁▁█▁▁▁█▁▁█▁█▁▁█

                             ┌                                            ┐
                         md5 ┤■■■■■■■■■■■■■■■■■■■■■■■■ 636.20 ms
                        sha1 ┤■■■■ 565.34 ms
                      sha256 ┤ 552.68 ms
                      sha512 ┤■■■■■■■■■■■■■■■■■■■■ 619.68 ms
                  blake2b512 ┤■■■■■■■■■■■■■ 598.29 ms
                  blake2s256 ┤■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 669.25 ms
                      blake3 ┤■■■■■■■■■■■■■■■■■■■■■■ 629.22 ms
                             └                                            ┘

summary
  sha256
   1.02x faster than sha1
   1.08x faster than blake2b512
   1.12x faster than sha512
   1.14x faster than blake3
   1.15x faster than md5
   1.21x faster than blake2s256
```
