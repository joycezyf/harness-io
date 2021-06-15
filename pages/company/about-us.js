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
import css from './about-us.module.scss'

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
    setIsModalVisible(false)
  }

  const handleCancel = () => {
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
        <div className={css.harnessIntro}>
          <div className={css.introTextContainer}>
            <div className={css.introText}>We’re Harness</div>
            {/*
            <div
              className={css.introSubText}
            >
              You are in great company
            </div>
            */}
            <div className={css.introDesc}>
              Our mission is to enable every software engineering team in the
              world to deliver code reliably, efficiently and quickly to their
              users.
            </div>
          </div>
          <div className={css.awards}>
            <div className={css.awardItem}>
              <img
                src="/co-about-award-tech-crunch.svg"
                width="120"
                height="60"
              />
              Best Tech Startups to work for in 2021
            </div>

            <div className={css.awardItem}>
              <img src="/co-about-award-forbes.svg" width="120" height="45" />
              50 Best Cloud Computing Companies to work for in 2021
            </div>

            <div className={css.awardItem}>
              <img src="/co-about-award-linkedin.svg" width="123" height="32" />
              <div>Top Startups 2020</div>
            </div>

            <div className={css.awardItem}>
              <img
                src="/co-about-award-glassdoor.svg"
                width="137"
                height="44"
              />
              <div>2021 Best Places to Work</div>
            </div>
          </div>
        </div>

        <div className={cx(css.executiveContainer, css.bgDot)}>
          <div className={css.executive}>
            <h3 className={css.title}>Our Executive Team</h3>
            <ul>
              <li>
                <div className={css.pic}>
                  <img
                    src="/co-about-exec-jyoti.svg"
                    width="283"
                    height="246"
                    alt="Jyoti Bansal"
                    onClick={showModal}
                  />
                </div>
                <h5 className={css.name}>Jyoti Bansal</h5>
                <div className={css.position}>Co-Founder &amp; CEO</div>
              </li>
              <li>
                <div className={css.pic}>
                  <img
                    src="/co-about-exec-rishi.svg"
                    width="283"
                    height="246"
                    alt="Rishi Singh"
                    onClick={showModal}
                  />
                </div>
                <h5 className={css.name}>Rishi Singh</h5>
                <div className={css.position}>Co-Founder &amp; CTO</div>
              </li>
              <li>
                <div className={css.pic}>
                  <img
                    src="/co-about-exec-jason.svg"
                    width="283"
                    height="246"
                    alt="Jason Eubanks"
                    onClick={showModal}
                  />
                </div>
                <h5 className={css.name}>Jason Eubanks</h5>
                <div className={css.position}>CRO</div>
              </li>
              <li>
                <div className={css.pic}>
                  <img
                    src="/co-about-exec-john.svg"
                    width="283"
                    height="246"
                    alt="John Bonney"
                    onClick={showModal}
                  />
                </div>
                <h5 className={css.name}>John Bonney</h5>
                <div className={css.position}>CFO</div>
              </li>
              <li>
                <div className={css.pic}>
                  <img
                    src="/co-about-exec-jill.svg"
                    width="283"
                    height="246"
                    alt="Jill Passalacqua"
                    onClick={showModal}
                  />
                </div>
                <h5 className={css.name}>Jill Passalacqua</h5>
                <div className={css.position}>Chief Counsel</div>
              </li>
              <li>
                <div className={css.pic}>
                  <img
                    src="/co-about-exec-steve.svg"
                    width="283"
                    height="246"
                    alt="Steve Burton"
                    onClick={showModal}
                  />
                </div>
                <h5 className={css.name}>Steve Burton</h5>
                <div className={css.position}>CMO</div>
              </li>
              <li>
                <div className={css.pic}>
                  <img
                    src="/co-about-exec-hemant.svg"
                    width="283"
                    height="246"
                    alt="Hemant Khandelwal"
                    onClick={showModal}
                  />
                </div>
                <h5 className={css.name}>Hemant Khandelwal</h5>
                <div className={css.position}>Head of Engineering</div>
              </li>
              <li>
                <div className={css.pic}>
                  <img
                    src="/co-about-exec-sri.svg"
                    width="283"
                    height="246"
                    alt="Sri Ramalingam"
                    onClick={showModal}
                  />
                </div>
                <h5 className={css.name}>Sri Ramalingam</h5>
                <div className={css.position}>SVP of Engineering</div>
              </li>
              <li>
                <div className={css.pic}>
                  <img
                    src="/co-about-exec-luan.svg"
                    width="283"
                    height="246"
                    alt="Luan Lam"
                    onClick={showModal}
                  />
                </div>
                <h5 className={css.name}>Luan Lam</h5>
                <div className={css.position}>VP of Talent</div>
              </li>
            </ul>
          </div>
        </div>

        {isModalVisible && (
          <Modal
            title={null}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={true}
            maskClosable={true}
            centered={true}
            width={740}
            height={608}
            footer={null}
            destroyOnClose={true}
            bodyStyle={{
              padding: 0,
              height: '608px',
              boxShadow: '0px 16px 24px #d77528',
              position: 'relative',
              marginTop: '100px',
              backgroundColor: 'var(--primary-10)',
              padding: '40px',
              boxSizing: 'border-box'
            }}
            wrapClassName={css.modal}
          >
            <img
              src="/co-about-exec-jyoti.svg"
              width="283"
              height="246"
              alt="Jyoti Bansal"
            />
            <div className={css.name}>Jyoti Bansal</div>
            <div className={css.position}>Co-Founder &amp; CEO</div>
            <div className={css.desc}>
              <p>
                Jyoti Bansal is a serial entrepreneur and a silicon valley
                technology visionary.
              </p>

              <p>
                Jyoti believes passionately in software’s ability to change the
                world for the better. In 2008, he founded AppDynamics, an
                application intelligence company that provides enterprises with
                real-time insights into application performance. Jyoti led the
                company as Founder &amp; CEO for the first eight years, and as
                Founder &amp; Chairman for the last one year until its
                acquisition by Cisco for $3.7 Billion in January 2017.
              </p>

              <p>
                Jyoti has been a recipient of many leadership awards, including
                Forbes’ “Best Cloud Computing CEO to Work For”, and “Best CEO”
                by San Francisco Business Times at the Annual Tech &amp;
                Innovation Award. He was named Ernst &amp; Young Entrepreneur Of
                The Year™ for Northern California in 2016.
              </p>

              <p>
                Jyoti received his BS in Computer Science from the Indian
                Institute of Technology, Delhi. Prior to founding AppDynamics,
                Jyoti worked at various silicon valley startups as a software
                engineer and architect. Jyoti is the lead inventor on 20+ US
                patents.
              </p>
            </div>
          </Modal>
        )}

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
            src="/co-about-team-1.svg"
            placeholderSrc="/favicon.png"
            className={css.teamImgWhyHarness}
            width="552"
            height="466"
            // onClick={showModal}
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

        <div className={cx(css.sectionInvestors, css.bgDotBlue)}>
          <div className={css.inner}>
            <h3 className={css.title}>Investors</h3>
            <div className={css.desc}>
              Harness was spun out of BIG Labs, a startup studio designed to
              solve hard technology problems and build enduring companies.
              Harness has raised $195M of venture capital from top-tier
              investors.
            </div>
            {/*
            <ul className={css.investorList}>
              <li>
                <img />
                <span className={css.caption}>Competitive Salary</span>
              </li>
            </ul>
            */}
            <LazyLoadImage
              src="/co-about-investors.svg"
              placeholderSrc="/favicon.png"
              width="1050"
              height="340"
              alt="Placeholder Image, to be replaced"
              className={css.placeholder}
            />
          </div>
        </div>

        <div className={css.offices}>
          <div className={css.inner}>
            <div className={css.introTextContainer}>
              <div className={css.introText}>Our offices</div>
            </div>
            <div className={css.officeList}>
              <div className={css.office}>
                <div className={css.city}>San Francisco</div>
                <div className={css.address}>
                  116 New Montgomery Street, San Francisco, CA 94105
                </div>
              </div>
              <div className={css.office}>
                <div className={css.city}>Mountain View</div>
                <div className={css.address}>
                  444 Castro Street, Mountain View, CA 94105
                </div>
              </div>
              <div className={css.office}>
                <div className={css.city}>Dallas</div>
                <div className={css.address}>
                  5001 Lyndon B Johnson Freeway Ste 550 Dallas, TX 75244
                </div>
              </div>
              <div className={css.office}>
                <div className={css.city}>London</div>
                <div className={css.address}>
                  5 Merchant Square London W2 1A
                </div>
              </div>
              <div className={css.office}>
                <div className={css.city}>Bengaluru</div>
                <div className={css.address}>
                  1329, 24th Main Rd Garden Layout, Sector 2, HSR Layout
                  Bengaluru, Karnataka 560102, India
                </div>
              </div>
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

export default CompanyCareers
