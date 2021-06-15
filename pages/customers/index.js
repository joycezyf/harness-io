import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'
import Marquee from 'react-fast-marquee'
import cx from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import {
  debounce,
  // getScrollTop,
  getClientWidth
} from '../../common/util'

import { GET_PAGE } from '../../queries'
import client from '../../common/apollo-client-ref'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Error from '../../components/Error'

import css from './customers.module.scss'

const ProductPlatform = props => {
  const [imgLoaded, setImgLoaded] = useState({})
  const [clientWidth, setClientWidth] = useState(0)

  useEffect(() => {
    debounceResize()
    if (window.addEventListener) {
      // window.addEventListener('scroll', debounceResize)
      window.addEventListener('resize', debounceResize)
      return function cleanup() {
        // window.removeEventListener('scroll', debounceResize)
        window.removeEventListener('resize', debounceResize)
      }
    } else if (window.attachEvent) {
      // window.attachEvent('onscroll', debounceResize)
      window.attachEvent('onresize', debounceResize)
      return function cleanup() {
        // window.detachEvent('onscroll', debounceResize)
        window.detachEvent('onresize', debounceResize)
      }
    }
  }, [])

  function handleResize(e) {
    // const rawScrollTop = getScrollTop()
    const rawClientWidth = getClientWidth()
    // setScrollTop(rawScrollTop)
    setClientWidth(rawClientWidth)
  }
  const debounceResize = debounce(handleResize, 600)

  function handleImgLoad(e, imgId) {
    setTimeout(
      () =>
        setImgLoaded(loaded => Object.assign({}, loaded, { [imgId]: true })),
      500
    )
  }

  const {
    // loading,
    error,
    data: {
      marketingSite: {
        caseStudy1,
        caseStudy1Client,
        caseStudy2,
        caseStudy2Client
      } = {}
    } = {}
  } = props
  if (error) {
    return <Error />
  }

  const isMobile = clientWidth > 0 && clientWidth < 1440
  return (
    <>
      <Header />
      <main className={css.main}>
        <div className={css.harnessIntro}>
          <div className={css.introTextContainer}>
            <div className={css.introText}>
              Trusted by 350 businesses and counting
            </div>
            <div
              className={css.introSubText}
              // dangerouslySetInnerHTML={{
              //   __html: heroSubTitle.replace(/\n/g, '<br />')
              // }}
            >
              You are in great company
            </div>
            <div className={css.introDesc}>
              More than 350 DevOps and engineering teams are powered by Harness
              to become elite performers in velocity, quality, efficiency and
              governance.
            </div>
            <Button type="primary" className={css.btnSignUp}>
              Sign Up for Free
            </Button>
          </div>
          <div className={css.introIllustration}>{/* placeholder */}</div>
        </div>

        <div className={cx(css.customerMarquee, css.bgDot)}>
          <Marquee gradient={false}>
            <ul>
              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
              </li>
            </ul>
          </Marquee>
        </div>

        <div className={css.modules2Col}>
          <div className={cx(css.module, css.greenBg)}>
            <div className={css.moduleName}>
              <img src="/icon-cd.svg" width="40" height="40" />
              Continuous Delivery
            </div>
            <div className={css.quote}>
              <img src="/quote-current-color.svg" width="40" height="40" />
            </div>
            <div className={css.customerSay}>
              We were acting like we had an advanced CI/CD culture with the
              capability to deploy multiple times a day. The truth is we didn’t
              have the infrastructure to support that for all our teams.
            </div>
            <div className={css.customerName}>
              Russ Barnett | Chief Architect | Ancestry
            </div>
            <div className={css.buttons}>
              <Button>Read Case Study</Button>
            </div>
            <div className={css.watchVideo}>
              <img src="/customers-play-btn.svg" width="42" height="34" />
              Watch case Video
            </div>
            <div className={css.customerProfile}>
              <img src="/customers-profile-1.svg" width="236" height="359" />
            </div>
          </div>
          <div className={cx(css.module)}>
            <div className={css.moduleName}>
              <img src="/icon-ch-intel.svg" width="40" height="40" />
              Change Intelligence
            </div>
            <div className={css.quote}>
              <img src="/quote-current-color.svg" width="40" height="40" />
            </div>
            <div className={css.customerSay}>
              Harness helps us prevent brain drain by removing the frustration
              engineers face while deploying.
            </div>
            <div className={css.customerName}>
              Aditya Chandra | VP of Infrastructure and Security
            </div>
            <div className={css.buttons}>
              <Button>Read Case Study</Button>
            </div>
            <div className={css.watchVideo}>
              <img src="/customers-play-btn.svg" width="42" height="34" />
              Watch case Video
            </div>
            <div className={css.customerProfile}>
              <img src="/customers-profile-2.svg" width="236" height="359" />
            </div>
          </div>
        </div>

        <div className={css.modules2Col}>
          <div className={cx(css.module)}>
            <div className={css.moduleName}>
              <img src="/icon-ci.svg" width="40" height="40" />
              Continuous Integration
            </div>
            <div className={css.quote}>
              <img src="/quote-current-color.svg" width="40" height="40" />
            </div>
            <div className={css.customerSay}>
              Harness has helped us test new features and increased our level of
              innovation.
            </div>
            <div className={css.customerName}>
              Taylor Daugherty | Site Reliability Engineering Manager |
              BetterCloud
            </div>
            <div className={css.buttons}>
              <Button>Read Case Study</Button>
            </div>
            <div className={css.watchVideo}>
              <img src="/customers-play-btn.svg" width="42" height="34" />
              Watch case Video
            </div>
            <div className={css.customerProfile}>
              <img src="/customers-profile-3.svg" width="236" height="359" />
            </div>
          </div>
          <div className={cx(css.module, css.orangeBg)}>
            <div className={css.moduleName}>
              <img src="/icon-ff.svg" width="40" height="40" />
              Change Intelligence
            </div>
            <div className={css.quote}>
              <img src="/quote-current-color.svg" width="40" height="40" />
            </div>
            <div className={css.customerSay}>
              Harness helps us prevent brain drain by removing the frustration
              engineers face while deploying.
            </div>
            <div className={css.customerName}>
              Aditya Chandra | VP of Infrastructure and Security
            </div>
            <div className={css.buttons}>
              <Button>Read Case Study</Button>
            </div>
            <div className={css.watchVideo}>
              <img src="/customers-play-btn.svg" width="42" height="34" />
              Watch case Video
            </div>
            <div className={css.customerProfile}>
              <img src="/customers-profile-4.svg" width="236" height="359" />
            </div>
          </div>
        </div>

        <div className={css.modules2Col}>
          <div className={cx(css.module, css.greenBg)}>
            <div className={css.moduleName}>
              <img src="/icon-ccm.svg" width="40" height="40" />
              Cloud Cost Management
            </div>
            <div className={css.quote}>
              <img src="/quote-current-color.svg" width="40" height="40" />
            </div>
            <div className={css.customerSay}>
              With Harness, I’m able to give engineers the same deployment
              experience as a huge tech company with a giant DevOps team.
            </div>
            <div className={css.customerName}>
              Evan Thomas | Lead Software Engineer | Tilting Point
            </div>
            <div className={css.buttons}>
              <Button>Read Case Study</Button>
            </div>
            <div className={css.watchVideo}>
              <img src="/customers-play-btn.svg" width="42" height="34" />
              Watch case Video
            </div>
            <div className={css.customerProfile}>
              <img src="/customers-profile-5.svg" width="236" height="359" />
            </div>
          </div>
          <div className={cx(css.module)}>
            <div className={css.moduleName}>
              <img src="/icon-ch-intel.svg" width="40" height="40" />
              Change Intelligence
            </div>
            <div className={css.quote}>
              <img src="/quote-current-color.svg" width="40" height="40" />
            </div>
            <div className={css.customerSay}>
              Harness is flexible and allows us to deploy the way we want.
            </div>
            <div className={css.customerName}>
              Marc Pearce | Cloud Operations Manager
            </div>
            <div className={css.buttons}>
              <Button>Read Case Study</Button>
            </div>
            <div className={css.watchVideo}>
              <img src="/customers-play-btn.svg" width="42" height="34" />
              Watch case Video
            </div>
            <div className={css.customerProfile}>
              <img src="/customers-profile-6.svg" width="236" height="359" />
            </div>
          </div>
        </div>

        <div className={css.modules2Col}>
          <div className={cx(css.module)}>
            <div className={css.moduleName}>
              <img src="/icon-ci.svg" width="40" height="40" />
              Continuous Integration
            </div>
            <div className={css.quote}>
              <img src="/quote-current-color.svg" width="40" height="40" />
            </div>
            <div className={css.customerSay}>
              Harness has helped us test new features and increased our level of
              innovation.
            </div>
            <div className={css.customerName}>
              Taylor Daugherty | Site Reliability Engineering Manager |
              BetterCloud
            </div>
            <div className={css.buttons}>
              <Button>Read Case Study</Button>
            </div>
            <div className={css.watchVideo}>
              <img src="/customers-play-btn.svg" width="42" height="34" />
              Watch case Video
            </div>
            <div className={css.customerProfile}>
              <img src="/customers-profile-7.svg" width="236" height="359" />
            </div>
          </div>
          <div className={cx(css.module, css.orangeBg)}>
            <div className={css.moduleName}>
              <img src="/icon-ff.svg" width="40" height="40" />
              Change Intelligence
            </div>
            <div className={css.quote}>
              <img src="/quote-current-color.svg" width="40" height="40" />
            </div>
            <div className={css.customerSay}>
              Our teams were initially skeptical of getting rid of their Jenkins
              pipelines for Harness, but now they’re big fans of the Harness UI
              and the ease it brings to the deployment process.
            </div>
            <div className={css.customerName}>
              Russ Barnett | Chief Architect | Ancestry
            </div>
            <div className={css.buttons}>
              <Button>Read Case Study</Button>
            </div>
            <div className={css.watchVideo}>
              <img src="/customers-play-btn.svg" width="42" height="34" />
              Watch case Video
            </div>
            <div className={css.customerProfile}>
              <img src="/customers-profile-8.svg" width="236" height="359" />
            </div>
          </div>
        </div>

        <div className={css.customersContainer}>
          <div className={cx(css.caseStudy, css.bgDot)}>
            <div className={css.sectionWrapper}>
              <div className={css.quote}>
                <img src="/quote.svg" width="34" height="26" />
              </div>
              <div className={css.customersSay}>{caseStudy1}</div>
              <div className={css.customerName}>{caseStudy1Client}</div>
              <Button className={css.btnLight}>Read Case Study</Button>
              <LazyLoadImage
                className={
                  imgLoaded.p1 ? css.profileRight : css.profileRightBeforeLoaded
                }
                src="/customers-casestudy-profile.svg"
                placeholderSrc="/favicon.png"
                afterLoad={e => handleImgLoad(e, 'p1')}
                width="313"
                height="249"
              />
            </div>
          </div>
        </div>
        <div className={cx(css.platformModules)}>
          <div className={css.inner}>
            {/* <LazyLoadImage
            src="/product-platform-harnessbg.svg"
            className={css.harnessWatermark}
          /> */}
            <h5 className={css.supTitle}>Explore Products</h5>
            <h2 className={css.title}>
              Fully integrated modules with one pipeline for all
            </h2>
            <div className={css.desc}>
              Learn more about our platform and modules
            </div>
            <ul>
              <li>
                <Link href="/products/cd">
                  <a>
                    <div className={css.moduleContainer}>
                      <div className={css.icon}>
                        <img src="/icon-cd.svg" width="64" height="64" />
                      </div>
                      <div className={css.text}>
                        <h5 className={css.moduleTitle}>Continuous Delivery</h5>
                        <div className={css.moduleDesc}>
                          Self-Service Continuous Delivery module that enables
                          engineers to deploy on-demand.
                        </div>
                      </div>
                      <div className={css.buttons}>
                        <Button>Learn More</Button>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products/ci">
                  <a>
                    <div className={css.moduleContainer}>
                      <div className={css.icon}>
                        <img src="/icon-ci.svg" width="64" height="64" />
                      </div>
                      <div className={css.text}>
                        <h5 className={css.moduleTitle}>
                          Continuous Integration
                        </h5>
                        <div className={css.moduleDesc}>
                          Container-native CI Solution - all builds are
                          isolated, and all extensions are standardized.
                        </div>
                      </div>
                      <div className={css.buttons}>
                        <Button>Learn More</Button>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
              <li>
                <div className={css.moduleContainer}>
                  <div className={css.icon}>
                    <img src="/icon-ff.svg" width="64" height="64" />
                  </div>
                  <div className={css.text}>
                    <h5 className={css.moduleTitle}>Feature Flags</h5>
                    <div className={css.moduleDesc}>
                      Empower product development teams to quickly release
                      features, with minimal risk.
                    </div>
                  </div>
                  <div className={css.buttons}>
                    <Button>Learn More</Button>
                  </div>
                </div>
              </li>
              <li>
                <div className={css.moduleContainer}>
                  <div className={css.icon}>
                    <img src="/icon-ccm.svg" width="64" height="64" />
                  </div>
                  <div className={css.text}>
                    <h5 className={css.moduleTitle}>Cloud Cost Management</h5>
                    <div className={css.moduleDesc}>
                      Empowers engineers with cloud cost visibility of their
                      apps, microservices, and clusters.
                    </div>
                  </div>
                  <div className={css.buttons}>
                    <Button>Learn More</Button>
                  </div>
                </div>
              </li>
              <li>
                <div className={css.moduleContainer}>
                  <div className={css.icon}>
                    <img src="/icon-ch-intel.svg" width="64" height="64" />
                  </div>
                  <div className={css.text}>
                    <h5 className={css.moduleTitle}>Change Intelligence</h5>
                    <div className={css.moduleDesc}>
                      Keep sane with your change velocity - manage SLOs and
                      error budgets with ease.
                    </div>
                  </div>
                  <div className={css.buttons}>
                    <Button>Learn More</Button>
                  </div>
                </div>
              </li>
              <li>
                <div className={css.moduleContainer}>
                  <div className={css.icon}>
                    <img src="/icon-ch-intel.svg" width="64" height="64" />
                  </div>
                  <div className={css.text}>
                    <h5 className={css.moduleTitle}>
                      Continuous Infrastructure
                    </h5>
                    <div className={css.moduleDesc}>
                      Manage your infrastructure as code - realized via
                      terraform scripts or json.
                    </div>
                  </div>
                  <div className={css.buttons}>
                    <Button>Learn More</Button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/* getStaticProps, TBD... */
export async function getStaticProps(context) {
  const res = await client.query({ query: GET_PAGE, variables: { id: 1 } })
  return {
    props: res // will be passed to the page component as props
  }
}

export default ProductPlatform
