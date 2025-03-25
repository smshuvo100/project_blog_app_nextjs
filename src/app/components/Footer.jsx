"use client";

import Link from "next/link";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
export default function FooterCom() {
  return (
    <footer className="footer">
      <div className="footer-body">
        <div className="main-footer">
          <div className="container">
            <div className="flax-box">
              <div className="call-1">
                <Link href="/" class="brand">
                  <h2>
                    <span>SSweb.online</span> Blog
                  </h2>
                </Link>
              </div>
              <div className="call-2">
                <div>
                  <h3 className="title">About</h3>
                  <div className="f-coll">
                    <Link href="https://www.100jsprojects.com" target="_blank" rel="noopener noreferrer">
                      100 JS Projects
                    </Link>
                    <Link href="/about" target="_blank" rel="noopener noreferrer">
                      Sahand&apos;s Blog
                    </Link>
                  </div>
                </div>
                <div>
                  <h3 className="title">Follow us</h3>
                  <div className="f-coll">
                    <Link href="https://www.github.com/sahandghavidel" target="_blank" rel="noopener noreferrer">
                      Github
                    </Link>
                    <Link href="#">Discord</Link>
                  </div>
                </div>
                <div>
                  <h3 className="title">Legal</h3>
                  <div className="f-coll">
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms &amp; Conditions</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <div className="box">
              <div className="copyright-text">{new Date().getFullYear()} Sahand's blog</div>
              <div className="social-footer">
                <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <BsFacebook />
                </Link>
                <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <BsInstagram />
                </Link>
                <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <BsTwitter />
                </Link>
                <Link href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                  <BsGithub />
                </Link>
                <Link href="https://www.dribbble.com" target="_blank" rel="noopener noreferrer">
                  <BsDribbble />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
