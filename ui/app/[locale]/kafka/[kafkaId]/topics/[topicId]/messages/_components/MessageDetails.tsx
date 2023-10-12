import { Message } from "@/api/topics";
import {
  ClipboardCopy,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  DrawerActions,
  DrawerCloseButton,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  Flex,
  FlexItem,
  Tab,
  Tabs,
  TabTitleText,
  Text,
  TextContent,
  TextVariants,
} from "@/libs/patternfly/react-core";
import { parseISO } from "date-fns";
import { useFormatter, useTranslations } from "next-intl";
import { NoDataCell } from "./NoDataCell";
import { beautifyUnknownValue } from "./utils";

export type MessageDetailsProps = {
  onClose: () => void;
  defaultTab: MessageDetailsBodyProps["defaultTab"];
  message: Message | undefined;
};
export function MessageDetails({
  onClose,
  defaultTab,
  message,
}: MessageDetailsProps) {
  const t = useTranslations("message-browser");

  return (
    <DrawerPanelContent isResizable={true} minSize={"400px"}>
      <DrawerHead>
        <TextContent>
          <Text component={TextVariants.h2}>{t("message")}</Text>
        </TextContent>
        <DrawerActions>
          <DrawerCloseButton onClick={onClose} />
        </DrawerActions>
      </DrawerHead>
      <DrawerContentBody>
        {message && (
          <MessageDetailsBody
            defaultTab={defaultTab}
            messageKey={message.key}
            {...message}
          />
        )}
      </DrawerContentBody>
    </DrawerPanelContent>
  );
}

export type MessageDetailsBodyProps = {
  defaultTab: "value" | "headers";
  messageKey: Message["key"];
} & Omit<Message, "key">;

export function MessageDetailsBody({
  defaultTab,
  ...message
}: MessageDetailsBodyProps) {
  const t = useTranslations("message-browser");
  const format = useFormatter();

  return (
    <Flex direction={{ default: "column" }} data-testid={"message-details"}>
      <FlexItem>
        <DescriptionList isHorizontal isCompact>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.partition")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.partition}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.offset")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.offset}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.timestamp")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.timestamp ? (
                format.dateTime(parseISO(message.timestamp), {
                  dateStyle: "long",
                  timeStyle: "long",
                })
              ) : (
                <NoDataCell columnLabel={t("field.timestamp")} />
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.epoch")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.timestamp ? (
                format.dateTime(parseISO(message.timestamp), {
                  dateStyle: "long",
                  timeStyle: "long",
                })
              ) : (
                <NoDataCell columnLabel={t("field.epoch")} />
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("field.key")}</DescriptionListTerm>
            <DescriptionListDescription>
              {message.messageKey ? (
                message.messageKey
              ) : (
                <NoDataCell columnLabel={t("field.key")} />
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </FlexItem>
      <FlexItem>
        {/* set key to be a random number to force redraw the tabs in order to change the active tab from the outside */}
        <Tabs defaultActiveKey={defaultTab} key={Math.random()}>
          <Tab
            eventKey={"value"}
            title={<TabTitleText>{t("field.value")}</TabTitleText>}
          >
            <ClipboardCopy isCode={true} isExpanded={true} isReadOnly={true}>
              {beautifyUnknownValue(message.value || "")}
            </ClipboardCopy>
          </Tab>
          <Tab
            eventKey={"headers"}
            title={<TabTitleText>{t("field.headers")}</TabTitleText>}
          >
            <ClipboardCopy isCode={true} isExpanded={true} isReadOnly={true}>
              {beautifyUnknownValue(JSON.stringify(message.headers) || "")}
            </ClipboardCopy>
          </Tab>
        </Tabs>
      </FlexItem>
    </Flex>
  );
}