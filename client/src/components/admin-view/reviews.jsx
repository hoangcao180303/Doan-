import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews, deleteReview } from "@/store/admin/review-slice";
import { useToast } from "@/components/ui/use-toast";


function AdminReviewsView() {
  const { reviewList } = useSelector((state) => state.adminReview);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllReviews()); // Cập nhật lại danh sách review
        toast({
          title: "Delete successfully", // Sửa từ "tilte" thành "title"
        });
      }
    });
  }

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Review ID</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Star</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewList && reviewList.length > 0
              ? reviewList.map((reviewItem) => (
                  <TableRow>
                    <TableCell>{reviewItem?._id}</TableCell>
                    <TableCell>{reviewItem?.productId}</TableCell>
                    <TableCell>{reviewItem?.userName}</TableCell>
                    <TableCell>{reviewItem?.reviewValue}</TableCell>
                    <TableCell>{reviewItem?.reviewMessage}</TableCell>
                    <TableCell>
                    <Button
                          onClick={() =>
                            handleDelete(reviewItem?._id)
                          }
                        >
                          Delete
                    </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminReviewsView;
