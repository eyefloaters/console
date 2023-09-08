import { Breadcrumb, BreadcrumbItem } from "@/libs/patternfly/react-core";

export default function DefaultBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbItem isActive>Loading...</BreadcrumbItem>
    </Breadcrumb>
  );
}