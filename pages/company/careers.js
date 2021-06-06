import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
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

import 'antd/lib/modal/style/index.css'
import css from './careers.module.scss'

const CompanyCareers = props => {
  const [imgLoaded, setImgLoaded] = useState({})
  const [clientWidth, setClientWidth] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)

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

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    console.log('... handleOk ...')
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    console.log('... handleCancel ...')
    setIsModalVisible(false)
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
        <div className={css.joinTheTeam}>
          <img
            src="/co-career-team-1.svg"
            // placeholderSrc="/favicon.png"
            className={css.teamImg1}
            width="377"
            height="287"
          />
          <LazyLoadImage
            src="/co-career-team-2.svg"
            placeholderSrc="/favicon.png"
            className={css.teamImg2}
            width="328"
            height="245"
          />
          <img
            src="/co-career-team-3.svg"
            // placeholderSrc="/favicon.png"
            className={css.teamImg3}
            width="335"
            height="275"
          />
          <img
            src="/co-career-team-4.svg"
            // placeholderSrc="/favicon.png"
            className={css.teamImg4}
            width="254"
            height="324"
          />
          <img
            src="/co-career-team-5.svg"
            // placeholderSrc="/favicon.png"
            className={css.teamImg5}
            width="310"
            height="389"
          />
          <img
            src="/co-career-team-6.svg"
            // placeholderSrc="/favicon.png"
            className={css.teamImg6}
            width="294"
            height="296"
          />
          <img
            src="/co-career-team-7.svg"
            // placeholderSrc="/favicon.png"
            className={css.teamImg7}
            width="213"
            height="330"
          />
          <LazyLoadImage
            src="/co-career-why-harness.svg"
            placeholderSrc="/favicon.png"
            className={css.teamImgWhyHarness}
            width="607"
            height="538"
            onClick={showModal}
          />
          <div className={css.textContainer}>
            <h3 className={css.title}>Join the Team!</h3>
            <div className={css.desc}>
              We’re always on the lookout for like-minded folks to join our
              fast-growing global team. Join us in taking software delivery into
              the future.
            </div>
            <div className={css.buttons}>
              <Button type="primary">View Open Positions</Button>
            </div>
          </div>
        </div>
        {isModalVisible && (
          <Modal
            title={null}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            maskClosable={true}
            centered={true}
            width={1120}
            height={630}
            footer={null}
            destroyOnClose={true}
            bodyStyle={{ padding: 0, height: '630px' }}
          >
            <iframe
              width="1120"
              height="630"
              src="https://www.youtube.com/embed/SEL1EzMCxs8?&autoplay=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Modal>
        )}

        <div className={cx(css.valuesContainer, css.bgDot)}>
          <div className={css.productFeatures}>
            <h3 className={css.title}>Our Core Values</h3>
            <ul>
              <li>
                <div className={css.subIcon}>
                  <img
                    src="/co-career-values-be-bold.svg"
                    width="80"
                    height="80"
                  />
                </div>
                <h5 className={css.subTitle}>Be Bold</h5>
                <div className={css.subCon}>
                  We are pioneers in defining this market space, pushing the
                  boundaries of continuous delivery and beyond.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img src="/co-career-values-kyc.svg" width="80" height="80" />
                </div>
                <h5 className={css.subTitle}>Know Your Customers</h5>
                <div className={css.subCon}>
                  We invest deeply in understanding and anticipating our
                  customers’ needs to make them successful – their success is
                  our success.
                </div>
              </li>

              <li>
                <div className={css.subIcon}>
                  <img src="/co-career-values-ci.svg" width="80" height="80" />
                </div>
                <h5 className={css.subTitle}>Continuously Improve</h5>
                <div className={css.subCon}>
                  We celebrate our wins, learn from our losses, and are not
                  afraid to fail.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img
                    src="/co-career-values-trust.svg"
                    width="80"
                    height="80"
                  />
                </div>
                <h5 className={css.subTitle}>Build Trust</h5>
                <div className={css.subCon}>
                  We prioritize transparency, and trust our leaders and team
                  members to make the right decisions.
                </div>
              </li>

              <li>
                <div className={css.subIcon}>
                  <img
                    src="/co-career-values-humble.svg"
                    width="80"
                    height="80"
                  />
                </div>
                <h5 className={css.subTitle}>Stay Humble</h5>
                <div className={css.subCon}>
                  We are pioneers in defining this market space, pushing the
                  boundaries of continuous delivery and beyond.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img
                    src="/co-career-values-human.svg"
                    width="80"
                    height="80"
                  />
                </div>
                <h5 className={css.subTitle}>Remember the Human</h5>
                <div className={css.subCon}>
                  We invest deeply in understanding and anticipating our
                  customers’ needs to make them successful – their success is
                  our success.
                </div>
              </li>

              <li>
                <div className={css.subIcon}>
                  <img
                    src="/co-career-values-celebrate.svg"
                    width="80"
                    height="80"
                  />
                </div>
                <h5 className={css.subTitle}>Celebrate Together</h5>
                <div className={css.subCon}>
                  We celebrate milestones, special occasions, and wins together,
                  and recognize the individuals that Get Ship Done.
                </div>
              </li>
              <li>
                <div className={css.subIcon}>
                  <img
                    src="/co-career-values-getshipdone.svg"
                    width="80"
                    height="80"
                  />
                </div>
                <h5 className={css.subTitle}>Get Ship Done</h5>
                <div className={css.subCon}>
                  Delivering is in our DNA. We always find a way to get ship
                  done and deliver on time.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={cx(css.section2Col, css.bgYellow)}>
          <div className={css.inner}>
            <div className={css.text}>
              <h3 className={css.title}>Diversity &amp; Belonging</h3>
              <div className={css.desc}>
                We have created a workplace that is inclusive of everyone. Being
                yourself is not only embraced but celebrated at Harness, and all
                backgrounds can thrive.
              </div>
            </div>
            <div className={css.img}>
              <LazyLoadImage
                src="/co-career-diversity.svg"
                placeholderSrc="/favicon.png"
                width="657" height="650"
              />
            </div>
          </div>
        </div>

        <div className={css.section2Col}>
          <div className={css.inner}>
            <div className={css.img}>
              <LazyLoadImage
                src="/co-career-women.svg"
                placeholderSrc="/favicon.png"
                width="636" height="643"
              />
            </div>
            <div className={css.text}>
              <h3 className={css.title}>Women at Harness</h3>
              <div className={css.desc}>
              We believe that women bring invaluable qualities into the workplace: communication styles, thought processes, problem-solving approaches, and creativity channels. 
We strive to foster a female friendly work environment that will attract and retain the best women in the workforce.
              </div>
            </div>
          </div>
        </div>

        <div className={cx(css.section2Col, css.bgOrange)}>
          <div className={css.inner}>
            <div className={css.text}>
              <h3 className={css.title}>Pride in Tech</h3>
              <div className={css.desc}>
              In the efforts of building a diverse workforce, we stand strong with the LGBTQ community and advocating for LGBTQ rights. We are committed to provide a safe, accepting and welcoming workplace.
              </div>
            </div>
            <div className={css.img}>
              <LazyLoadImage
                src="/co-career-tech.svg"
                placeholderSrc="/favicon.png"
                width="670" height="629"
              />
            </div>
          </div>
        </div>

        <div className={cx(css.sectionBenefits, css.bgDot)}>
          <div className={css.inner}>
          <h3 className={css.title}>Benefits &amp; Perks</h3>
          <ul className={css.benefitList}>
            <li>
              <img src="/co-career-benefits-competitive-salary.svg" width="80" height="80" alt="Competitive Salary" />
              <span className={css.caption}>Competitive Salary</span>
            </li>
            <li>
              <img src="/co-career-benefits-comprehensive-healthcare-benefits.svg" width="80" height="80" alt="Comprehensive Healthcare Benefits" />
              <span className={css.caption}>Comprehensive Healthcare Benefits</span>
            </li>
            <li>
              <img src="/co-career-benefits-fsa.svg" width="80" height="80" alt="Flexible Spending Account (FSA)" />
              <span className={css.caption}>Flexible Spending Account (FSA)</span>
            </li>
            <li>
              <img src="/co-career-benefits-computer-benefits.svg" width="80" height="80" alt="Computer Benefits" />
              <span className={css.caption}>Computer Benefits</span>
            </li>
            <li>
              <img src="/co-career-benefits-employee-referral-bonus.svg" width="80" height="80" alt="Employee Referral Bonus" />
              <span className={css.caption}>Employee Referral Bonus</span>
            </li>
            <li>
              <img src="/co-career-benefits-flexible-work-schedules.svg" width="80" height="80" alt="Flexible Work Schedules" />
              <span className={css.caption}>Flexible Work Schedules</span>
            </li>
            <li>
              <img src="/co-career-benefits-pet-friendly.svg" width="80" height="80" alt="Pet Friendly Office" />
              <span className={css.caption}>Pet Friendly Office</span>
            </li>
            <li>
              <img src="/co-career-benefits-drinks-and-snack.svg" width="80" height="80" alt="Unlimited Snacks &amp; Drinks" />
              <span className={css.caption}>Unlimited Snacks &amp; Drinks</span>
            </li>
            <li>
              <img src="/co-career-benefits-eap.svg" width="80" height="80" alt="Employee Assistance Program(EAP)" />
              <span className={css.caption}>Employee Assistance Program(EAP)</span>
            </li>
            <li>
              <img src="/co-career-benefits-parental-leave.svg" width="80" height="80" alt="Paid Time Off &amp; Parental Leave" />
              <span className={css.caption}>Paid Time Off &amp; Parental Leave</span>
            </li>
            <li>
              <img src="/co-career-benefits-team-building.svg" width="80" height="80" alt="Team Building Events" />
              <span className={css.caption}>Team Building Events</span>
            </li>
            <li>
              <img src="/co-career-benefits-custom-swag.svg" width="80" height="80" alt="Custom Swags" />
              <span className={css.caption}>Custom Swags</span>
            </li>
          </ul>
          </div>
        </div>

        <div className={css.equalOpportunity}>
          <h3 className={css.title}>Harness is an equal opportunity employer and values diversity in all its forms.</h3>
          <div className={css.desc}>We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.</div>
        </div>

        <div className={cx(css.caseStudy, css.bgDotBlue)}>
          <div className={css.sectionWrapper}>
            <div className={css.quote}>
              <img src="/quote.svg" width="34" height="26" />
            </div>
            <div className={css.customersSay}>The work at Harness is interesting, the people and culture are great, and it’s fun to be part of such an amazing growth story.</div>
            <div className={css.customerName}>Sahithi Kolichala, Sr. Software Engineer</div>
            <Button className={css.btnLight}>Read Case Study</Button>
            <LazyLoadImage
              className={
                imgLoaded.p2 ? css.profileLeft : css.profileLeftBeforeLoaded
              }
              src="/case-study-profile-career.svg"
              afterLoad={e => handleImgLoad(e, 'p2')}
              width="313"
              height="249"
            />
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

export default CompanyCareers
