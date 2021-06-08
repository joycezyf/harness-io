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

import css from './platform.module.scss'

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
        <div className={css.harnessIntroPlatform}>
          <div className={css.introTextContainer}>
            <div className={css.introText}>
              Integrated software delivery platform
            </div>
            <div
              className={css.introSubText}
              // dangerouslySetInnerHTML={{
              //   __html: heroSubTitle.replace(/\n/g, '<br />')
              // }}
            >
              One pipeline for everything you need
            </div>
            <div className={css.introDesc}>
              A self-service platform solution for every team. The Harness CI/CD
              Platform enables software changes of all types to reach production
              environments in a safe, quick, and sustainable way.
            </div>
            <Button type="primary" className={css.btnSignUp}>
              Sign Up for Free
            </Button>
            <div className={css.gitStar}>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=drone&repo=ui-core&type=star&count=true"
                frameBorder="0"
                scrolling="0"
                width="150"
                height="20"
                title="GitHub"
              ></iframe>
            </div>
          </div>
          <div className={css.introIllustration}>
            {isMobile ? (
              <div className={css.introIllustration}>
                <video
                  src="/harness-intro-mobile-hover.mp4"
                  width="375"
                  muted={true}
                  autoPlay={true}
                  loop={true}
                >
                  {/* <source src="/harness-intro-mobile-hover.mp4" type="video/mp4" /> */}
                  Sorry, your browser doesn't support embedded videos.
                </video>
                <a className={css.linkCI} href="#ci" />
                <a className={css.linkCD} href="#cd" />
                <a className={css.linkFeatureFlags} href="#feature-flags" />
                <a className={css.linkCloudCost} href="#cloud-cost" />
                <a className={css.linkChIntel} href="#ch-intel" />
              </div>
            ) : (
              <div className={css.introIllustration}>
                <video
                  width="960"
                  heiht="452"
                  src="/harness-hero-hover-3.mp4"
                  muted={true}
                  autoPlay={true}
                  loop={true}
                >
                  {/* <source src="/harness-intro-hover.mp4" type="video/mp4" /> */}
                  Sorry, your browser doesn't support embedded videos.
                </video>
                <a className={css.linkCI} href="#ci" />
                <a className={css.linkCD} href="#cd" />
                <a className={css.linkFeatureFlags} href="#feature-flags" />
                <a className={css.linkCloudCost} href="#cloud-cost" />
                <a className={css.linkChIntel} href="#ch-intel" />
              </div>
            )}
          </div>
        </div>

        <div className={cx(css.platformModules, css.bgDot)}>
          <div className={css.inner}>
            <LazyLoadImage
              src="/product-platform-harnessbg.svg"
              className={css.harnessWatermark}
            />
            <h5 className={css.supTitle}>Platform modules</h5>
            <h2 className={css.title}>
              Fully integrated modules with one pipeline for all
            </h2>
            <div className={css.desc}>
              Talk about the module pipelines, and how they can be integrated
              together. Talk about the module pipelines, and how they can be
              integrated together.
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

        <div className={css.anchorLinks}>
          <ul>
            <li>
              <Link href="#">
                <a>Supported Platforms</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>Hosting Options</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>Integrations</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>Platform Modules</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={css.platformContainer}>
          <h3 className={css.featuresTitle}>Features Every Great Team Needs</h3>
          <div className={css.productFeatures}>
            <ul>
              <li>
                <div className={css.subIcon}>
                  <img src="/feature-canary.svg" width="45" height="42" />
                </div>
                <h5 className={css.subTitle}>
                  Automated Canary &amp; Blue-Green Deployments
                </h5>
                <div className={css.subCon}>
                  More details describing the features, such as, a self-service
                  platform solution for every team. The Harness CI/CD Platform
                  enables software changes of all types to reach production
                  environments in a safe, quick, and sustainable way.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img src="/feature-rollbacks.svg" width="56" height="74" />
                </div>
                <h5 className={css.subTitle}>
                  ML-based Automated Deployment Verification &amp; Rollbacks
                </h5>
                <div className={css.subCon}>
                  More details describing the features, such as, a self-service
                  platform solution for every team. The Harness CI/CD Platform
                  enables software changes of all types to reach production
                  environments in a safe, quick, and sustainable way.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img src="/feature-pipeline.svg" width="69" height="56" />
                </div>
                <h5 className={css.subTitle}>
                  Developer Friendly Pipeline-as-Code Experience
                </h5>
                <div className={css.subCon}>
                  More details describing the features, such as, a self-service
                  platform solution for every team. The Harness CI/CD Platform
                  enables software changes of all types to reach production
                  environments in a safe, quick, and sustainable way.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img src="/feature-notification.svg" width="49" height="38" />
                </div>
                <h5 className={css.subTitle}>
                  Integrated Approval &amp; Notification flows
                </h5>
                <div className={css.subCon}>
                  More details describing the features, such as, a self-service
                  platform solution for every team. The Harness CI/CD Platform
                  enables software changes of all types to reach production
                  environments in a safe, quick, and sustainable way.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img src="/feature-infra.svg" width="58" height="60" />
                </div>
                <h5 className={css.subTitle}>
                  Automated Infrastructure Provisioning
                </h5>
                <div className={css.subCon}>
                  More details describing the features, such as, a self-service
                  platform solution for every team. The Harness CI/CD Platform
                  enables software changes of all types to reach production
                  environments in a safe, quick, and sustainable way.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img src="/feature-lib.svg" width="62" height="70" />
                </div>
                <h5 className={css.subTitle}>
                  Flexible Parametrization &amp; Template Library
                </h5>
                <div className={css.subCon}>
                  More details describing the features, such as, a self-service
                  platform solution for every team. The Harness CI/CD Platform
                  enables software changes of all types to reach production
                  environments in a safe, quick, and sustainable way.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img src="/feature-audit.svg" width="66" height="66" />
                </div>
                <h5 className={css.subTitle}>
                  Pipeline Governance &amp; Audit Trails
                </h5>
                <div className={css.subCon}>
                  More details describing the features, such as, a self-service
                  platform solution for every team. The Harness CI/CD Platform
                  enables software changes of all types to reach production
                  environments in a safe, quick, and sustainable way.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img src="/feature-security.svg" width="71" height="73" />
                </div>
                <h5 className={css.subTitle}>Enterprise-grade Security</h5>
                <div className={css.subCon}>
                  More details describing the features, such as, a self-service
                  platform solution for every team. The Harness CI/CD Platform
                  enables software changes of all types to reach production
                  environments in a safe, quick, and sustainable way.
                </div>
              </li>
            </ul>
          </div>

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
                src="/case-study-profile-platform-1.svg"
                placeholderSrc="/favicon.png"
                afterLoad={e => handleImgLoad(e, 'p1')}
                width="236"
                height="205"
              />
            </div>
          </div>

          <div className={css.sectionIntegrations}>
            <div className={css.inner}>
              <div className={css.text}>
                <div className={css.sup}>Integrations</div>
                <div className={css.title}>
                  Summarize the supported platforms
                </div>
                <div className={css.desc}>
                  <p>
                    List all the major supported platforms here. More
                    placeholder texts.
                  </p>
                </div>

                <Button>Learn More</Button>
              </div>
              <div className={css.logoWrapper}>
                <div className={css.logosPlatform}>
                  <img src="/icon_aws.svg" width="56" height="56" alt="AWS" />
                  <img src="/icon_gcp.svg" width="56" height="56" alt="GCP" />
                  <img
                    src="/icon_open_shift.svg"
                    width="56"
                    height="56"
                    alt="Open Shift"
                  />
                  <img
                    src="/icon_k8s.svg"
                    width="56"
                    height="56"
                    alt="Kubernetes"
                  />
                  <img
                    src="/icon_azure.svg"
                    width="56"
                    height="56"
                    alt="Azure"
                  />
                  <img
                    src="/icon_pivotal.svg"
                    width="56"
                    height="56"
                    alt="Pivotal"
                  />
                  <img
                    src="/icon_jenkins.svg"
                    width="56"
                    height="56"
                    alt="Jenkins"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={css.sectionOptions}>
            <div className={css.inner}>
              <div className={css.illus}>
                <LazyLoadImage
                  src="/product-platform-hosting-options.svg"
                  placeholderSrc="/favicon.png"
                  width="481"
                  height="245"
                />
              </div>
              <div className={css.text}>
                <div className={css.sup}>Hosting Options</div>
                <h3 className={css.title}>SaaS or On-prem</h3>
                <div className={css.desc}>
                  You won’t have to maintain a single deployment script ever
                  again. You just declare in YAML (or in UI) what you want to
                  automate and Harness does it for you.
                </div>

                <Button type="primary">Get Started for Free</Button>
                <Button>Download</Button>
              </div>
            </div>
          </div>

          <div className={css.sectionIntegrations}>
            <div className={css.inner}>
              <div className={css.text}>
                <div className={css.sup}>Integrations</div>
                <div className={css.title}>
                  Show all the integrations Harness support, and harness
                  connectors
                </div>
                <div className={css.desc}>
                  <p>
                    List the major integration categories, with examples, better
                    to include a graph to show where the integration point is.
                  </p>
                  <p>Talk about connectors</p>
                </div>

                <Button>Learn More</Button>
              </div>
              <div className={css.logoWrapper}>
                <div className={css.logosPlatform}>
                  <img src="/icon_aws.svg" width="56" height="56" alt="AWS" />
                  <img src="/icon_gcp.svg" width="56" height="56" alt="GCP" />
                  <img
                    src="/icon_open_shift.svg"
                    width="56"
                    height="56"
                    alt="Open Shift"
                  />
                  <img
                    src="/icon_k8s.svg"
                    width="56"
                    height="56"
                    alt="Kubernetes"
                  />
                  <img
                    src="/icon_azure.svg"
                    width="56"
                    height="56"
                    alt="Azure"
                  />
                  <img
                    src="/icon_pivotal.svg"
                    width="56"
                    height="56"
                    alt="Pivotal"
                  />
                  <img
                    src="/icon_jenkins.svg"
                    width="56"
                    height="56"
                    alt="Jenkins"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={cx(css.caseStudy, css.bgDotBlue)}>
            <div className={css.sectionWrapper}>
              <div className={css.quote}>
                <img src="/quote.svg" width="34" height="26" />
              </div>
              <div className={css.customersSay}>{caseStudy2}</div>
              <div className={css.customerName}>{caseStudy2Client}</div>
              <Button className={css.btnLight}>Read Case Study</Button>
              <LazyLoadImage
                className={
                  imgLoaded.p2 ? css.profileLeft : css.profileLeftBeforeLoaded
                }
                src="/case-study-profile-platform-2.svg"
                placeholderSrc="/favicon.png"
                afterLoad={e => handleImgLoad(e, 'p2')}
                width="313"
                height="249"
              />
            </div>
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
