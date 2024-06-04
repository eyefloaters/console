import { ConfigMap, NewConfigMap, TopicMutateError } from "@/api/topics/schema";
import { Error } from "@/app/[locale]/kafka/[kafkaId]/topics/create/Errors";
import { ReviewTable } from "@/app/[locale]/kafka/[kafkaId]/topics/create/ReviewTable";
import { Number } from "@/components/Format/Number";
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Grid,
  GridItem,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import { useTranslations } from "next-intl";

export function StepReview({
  name,
  partitions,
  replicas,
  options,
  initialOptions,
  error,
}: {
  name: string;
  partitions: number;
  replicas: number;
  options: NewConfigMap;
  initialOptions: ConfigMap;
  error: TopicMutateError | "unknown" | undefined;
}) {
  const t = useTranslations();
  const optionEntries = Object.entries(options);
  return (
    <Grid hasGutter={true}>
      <GridItem>
        <Title headingLevel={"h2"}>{t("CreateTopic.review_topic")}</Title>
      </GridItem>
      <GridItem>
        <Title headingLevel={"h3"}>{t("CreateTopic.topic_details")}</Title>
      </GridItem>
      {error && <Error error={error} />}
      <GridItem>
        <DescriptionList isHorizontal>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("CreateTopic.name")}</DescriptionListTerm>
            <DescriptionListDescription>
              {name || <i>{t("CreateTopic.empty")}</i>}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("CreateTopic.topic_partition_field")}</DescriptionListTerm>
            <DescriptionListDescription>
              <Number value={partitions} />
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>{t("CreateTopic.topic_replica_field")}</DescriptionListTerm>
            <DescriptionListDescription>
              <Number value={replicas} />
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </GridItem>
      <GridItem>
        <Title headingLevel={"h3"}>{t("CreateTopic.step_option_title")}</Title>
      </GridItem>
      <GridItem>
        {optionEntries.length > 0 ? (
          <ReviewTable options={options} initialOptions={initialOptions} />
        ) : (
          <TextContent>
            <Text component={"small"}>{t("CreateTopic.no_advanced_options_specified")}</Text>
          </TextContent>
        )}
      </GridItem>
    </Grid>
  );
}
