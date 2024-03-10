import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import { ArrowRight } from "lucide-react";

interface InviteUserEmailProps {
  full_name?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  inviteeProfileAvatar?: string;
}

const baseUrl = `https://${process.env.NEXT_PUBLIC_SITE_URL}/register`;

export const InviteUserEmail = ({
  full_name,
  invitedByUsername,
  invitedByEmail,
  inviteeProfileAvatar,
}: InviteUserEmailProps) => {
  const previewText = `Join TypingGo Invited by ${invitedByUsername}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://wvyhoweanvuyipgxdspf.supabase.co/storage/v1/object/public/avatars/TypingGo.png"
                width="40"
                height="37"
                alt="TypingGo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[20px] font-normal text-black">
              Join <strong>TypingGo</strong> and <strong>Compete</strong> With{" "}
              {invitedByUsername}
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hello {full_name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>{invitedByUsername}</strong> (
              <Link
                href={`mailto:${invitedByEmail}`}
                className="text-blue-600 no-underline"
              >
                {invitedByEmail}
              </Link>
              ) has invited you to the <strong>TypingGo</strong>.
            </Text>
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    className="rounded-full"
                    src={inviteeProfileAvatar}
                    width="64"
                    height="64"
                  />
                </Column>
                <Column align="center">
                  <Text className="text-xl text-black">🡲</Text>
                </Column>
                <Column align="left">
                  <Img
                    className="rounded-full border-2 border-dashed"
                    src="https://wvyhoweanvuyipgxdspf.supabase.co/storage/v1/object/public/avatars/TypingGo.png"
                    width="64"
                    height="64"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={baseUrl}
              >
                Join Typing
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{" "}
              <Link href={baseUrl} className="text-blue-600 no-underline">
                {baseUrl}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for{" "}
              <span className="text-black">{full_name}</span>. This invite was
              sent from <span className="text-black">by {invitedByEmail}</span>.
              If you were not expecting this invitation, you can ignore this
              email. If you are concerned about your account&#39;s safety,
              please reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default InviteUserEmail;
